# 架构

本文以图片为主，描述了系统的总体架构

## 系统组成

系统主要由一个评测控制端和多个评测机组成。

所有的评测机是等价的。运算速度的区别通过基线测试来计算修正系数。

## 系统外部

系统可以服务于多个需要进行在线评测的外部系统

同时可以向具有观察员权限的系统或用户提供系统运行状态

## 架构图

### 数据流图

#### 系统

```puml
@startuml
boundary "客户系统" as webbackend
actor "状态观察用户" as statususer
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
webbackend ---> judgerbackend : 评测指令
webbackend --> judgerbackend : 评测文件更新
statususer <-r-- judgerbackend : 评测系统运行状态
judgerbackend <---> jbfs : 读写题目数据
judgerbackend --> judger : 发放评测指令
judgerbackend --> judger : 发放题目数据
judgerbackend --> webbackend : 返回评测结果
judger --> judgerbackend : 返回评测结果
judger --> judgerbackend : 返回评测机状态
@enduml
```

#### 评测机

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
jb ----> ctrl : 评测数据
ctrl <--> rd : 评测数据缓存
ctrl --> core : 评测任务和数据
core --> ctrl : 评测结果
ctrl --> jb : 评测机状态
ctrl --> jb : 评测结果
@enduml
```
