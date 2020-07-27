# HTTPS协议

## 消息基本结构

有 GET 和 PUSH 两种可用方法。

对于任意请求，包含四个必选参数。

- 消息id `messageid`

  至少在数小时内不重复的字符串，用于防止重放攻击。

- 时间戳 `timestamp`

  消息发出的UNIX时间（UTC时区），如果客户系统与评测系统时间差超过一定程度会导致消息被拒绝。

- 签名 `signature`

  按照下面描述的规则使用 SecrectKey 进行签名的结果，无签名或签名有误的消息将被忽略。

- AccessKey `ackey`

## 返回值基本结构

返回一个 json对象，其 `statuscode` 键的值应当等同于 HTTP 应答码，
可选包含 `message` 字段为额外的说明消息，`body` 字段见说明。

### Get方法

#### 查询评测

##### 查询评测的URL

`/v1/judges`

##### 查询评测的参数

- 可选参数 `pagesize` 代表每页返回的数量，默认为 `50`。设为 `0` 代表查询所有的值（可能会很多，慎用）。

- 可选参数 `page` 代表查询的页码，从 `0` 开始计数。

- 可选参数 `statusfilter`, 可以包含多个值，代表仅返回状态在所选择的值当中的评测（筛选在分页之后，因此返回值数目必不大于 `pagesize`）。

<!-- - 可选参数 `order` , 支持按 `time` 排序 -->

##### 查询评测的返回值

一个 `string` 的列表，代表所查询的评测的id

#### 查询评测状态或结果

##### 查询评测状态的URL

`/v1/judges/state`

##### 查询评测状态的参数

- `judgeid` 表示要查询的评测，用 `,` 分隔来同时查询多个评测。

##### 查询评测状态的返回值

一个 `JudgeState` 对象的数组。具体见定义文件。

#### 查询评测详细信息

##### 查询评测详细信息的URL

`/v1/judges/detail`

##### 查询评测详细信息的参数

- `judgeid` 表示要查询的评测。

##### 查询评测详细信息的返回值

一个 `JudgeDetail` 对象。具体见定义文件。

#### 查询系统负载

##### 查询系统负载的URL

`/v1/system/status`

##### 查询系统负载的参数

无参数

##### 查询系统负载的返回值

一个 `SystemLoad` 对象，包含控制端和评测机的负载等信息。

#### 签名

Get方法的签名应当将访问的URL中 `signature` 参数填写为 `7def6260-cf55-11ea-87d0-0242ac130003`,然后对 `URL` 字符串如下处理得到签名

```typescript
let signature = crypto.createHash('sha256')
      .update(URLstring)
      .update(SecrectKey).digest('hex')
```

以查询评测为例。假设访问时间为 `1595779915` , 选定的消息id为 `125E591`,AccessKey 为 `10A9FC6FF1F`,SecrectKey为 `5F1DAB4B`

首先构造 URL 为 `https://api.localhost/v1/judges?ackey=10A9FC6FF1F&timestamp=1595779915&messageid=125E591&signature=7def6260-cf55-11ea-87d0-0242ac130003`。

然后计算得到 `373adf261028480a0bf6885a443f93c7df429a41204af1d22063d1ccd48026be`。

拼接得到真正的 URL `https://api.localhost/v1/judges?ackey=10A9FC6FF1F&timestamp=1595779915&messageid=125E591&signature=373adf261028480a0bf6885a443f93c7df429a41204af1d22063d1ccd48026be`。

### Post方法

#### 创建评测

##### 创建评测的URL

`/v1/judges`

##### 创建评测的负载

`CreateJudgeRequest`

##### 创建评测的返回值

`CreateJudgesResponse` 返回创建成功的任务的列表。

#### Post签名

将载荷的 `signature` 字段填写为 `7def6260-cf55-11ea-87d0-0242ac130003`,使用 `JSON.stringify()`将载荷转化为字符串，仿照Get的方法签名即可。
