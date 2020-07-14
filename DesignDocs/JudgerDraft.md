# 下一代评测机

## 总体

### 现有评测机

#### 现有评测机的优点

经过数代改进，现有的评测内核已经比较稳定，支持多种编程语言和SPJ。基本上满足OJ系统的需求。

#### 现有评测机的缺点

部署上与网页后端耦合，导致难以分离部署，难以引入多评测机机制。结果是在评测任务重时会抢占网站后端资源，导致网站陷入不能访问的局面。也难以拓展更高的评测性能。

### 计划做出的改进

#### 多评测机支持

采用 `C/S` 架构， `ws` 协议实现单控多评测机。

#### 与网页后端分离

评测客户端将只与评测控制端保持 `WebSocket` 连接。评测控制端与网页后端通过 `WebSocket` 交换评测指令，通过文件系统传递题目文件。

保持架构的相对独立，方便分离部署以及架设相关代理。

## 架构图

### 数据流图

#### 系统

```puml
@startuml
boundary "网页后端" as webbackend
frame "评测系统" {
  node "评测机" as judger
  control "评测控制端" as judgerbackend
  folder "评测控制端文件系统" as jbfs {
    folder 评测文件[
      题目输入输出
      ===
      SPJ代码
    ]
  }
}
webbackend --> judgerbackend : 评测指令
webbackend --> judgerbackend : 评测文件更新
judgerbackend <--> jbfs : 读写题目数据
judgerbackend --> judger : 发放评测指令
judgerbackend --> judger : 发放题目数据
judger --> judgerbackend : 返回评测结果
@enduml
```

#### 评测端

```puml
@startuml
boundary 评测控制端 as jb
node "评测机" as judger {
  agent 评测内核 as core
  control 评测机内部调度 as ctrl
  queue 评测队列 as que
  database Redis缓存 as rd
}
jb --> que : 评测任务
que --> ctrl : 评测任务
jb --> ctrl : 评测数据
ctrl <--> rd : 评测数据缓存
ctrl --> core : 评测任务和数据
core --> ctrl : 评测结果
ctrl --> jb : 评测结果
@enduml
```

### 连接鉴权

```puml
@startuml
scale 1
actor "评测机" as j
database "评测机缓存" as jb
control "评测机控制端" as b
database "后端缓存" as bb
collections "后端文件系统" as bfs
hnote over b : 生成密钥\n填入 Judger 的配置
group Auth
j --> b : 建立ws
b --> j : 发送认证询问
hnote over j : 用密钥加密
j --> b : 回应认证
alt Fail
b --x j : 断开ws
alt RepeatAuth
hnote over b : 断开被重复的Judger
end
else Success
b --> j : 发凭证
j --> b : 通报参数
j --> b : 发令牌
note right
令牌的个数取决于评测机的能力
是评测机的最大队列深度
endnote
end
end
@enduml
```

### 评测循环

```puml
@startuml
scale 1
actor "评测机" as j
database "评测机缓存" as jb
control "评测机控制端" as b
database "后端缓存" as bb
collections "后端文件系统" as bfs
loop 评测循环
hnote over b : 选取一个令牌
j <-- b : 发送任务给令牌对应的评测机
hnote over b : 将令牌和任务放入\n活动任务队列
activate j
note right
包含不可缓存内容和可缓存内容的handle
比如用户代码，时空限制等不能或不必缓存的内容
spj代码，题目输入输出等可缓存内容发送handle（带版本号）
endnote
j --> jb : 查询缓存
activate jb
alt Hit
jb --> j : 返回数据
deactivate jb
else Miss
j --\ b : 请求缺失的数据
activate b
b --> bb : 查询缓存
alt Hit
bb --> b : 返回缓存数据
else Miss
b --> bfs : 读取文件
activate bfs
bfs --> b : 获得数据
deactivate bfs
b --> bb : 写入缓存
end
b --\ j : 返回数据
deactivate b
end
hnote over j : 评测
j --> b : 返回评测结果
hnote over b : 回收任务\n生成令牌
deactivate j
end
@enduml
```

### 断联处理

```puml
@startuml
scale 1
actor "评测机" as j
database "评测机缓存" as jb
control "评测机控制端" as b
database "后端缓存" as bb
collections "后端文件系统" as bfs
alt Break
j --x b : 链接断开
hnote over b : 禁用密钥\n清理令牌\n重发相关任务
end
@enduml
```

### 心跳检测

```puml
@startuml
scale 1
actor "评测机" as j
database "评测机缓存" as jb
control "评测机控制端" as b
database "后端缓存" as bb
collections "后端文件系统" as bfs
loop HeartBeat
j --> b : 报告状态
hnote over b : 记录评测机状态\n并更新心跳计时
end
@enduml
```
