type EncryptedNumber = number | string;
type JudgerID = number | string;
interface Response 
{
    readonly status: number,
    readonly message?: string
};
/**
 * status 码与HTTP状态码具有类似含义
 * 200 请求的文件已找到或请求的评测已完成
 * 202 请求接受，正在处理
 * 301 任务已处理（由于没有收到回应，任务已重新分配
 * 401 尚未进行身份认证
 * 403 密钥校验不通过（按照协议应当同时断开链接）
 * 404 找不到请求的文件
 * 428 评测已失败由于不能加载文件
 * @deprecated 410 题目已修改，放弃此次评测（在试图请求文件的时候）
 * 500 内部故障
 * 503 评测机或服务器过载（比如分配的任务超过任务令牌限制）
 * 505 协议版本不匹配
 * 507 失败由于没有足够的硬盘空间（不能储存题目数据）
 */

interface JudgerMessage
{
    readonly judgerID: JudgerID//用于标识每个评测机
};

interface JudgerResponse extends Response, JudgerMessage { };

interface HandShakeStep2
{//Juder to Control
    readonly keyNumber: number,
    readonly encrypedRandNumber1: EncryptedNumber
};

interface HandShakeStep3 extends Response
{//Control to Judger
    readonly reEncrypedRandNumber1: EncryptedNumber,
    readonly encrypedRandNumber2: EncryptedNumber
};

interface HandShakeStep4 extends Response
{//Judger to Control
    readonly reEncrypedRandNumber2: EncryptedNumber
};

interface HandShakeStep5 extends Response
{//Control to Judger
    // confirm: boolean,
    readonly judgerID: JudgerID,
    readonly connectionToken: EncryptedNumber
};

interface ProtocolVersion
{
    readonly fieldA: number,//大版本号，不同可能不兼容
    readonly fieldB: number,//小版本号，应该不会不兼容
    readonly fieldC: number,//错误修复号，应当兼容，除非是错误行为
};

interface JudgerReadme extends JudgerMessage
{
    readonly protocolVersion: ProtocolVersion,
    // readonly ProtocolVersion: ProtocolVersion | number | string,
    readonly judgerHostName: string,
    readonly judgerTaskTokenCount: number
};

interface CPUPresure
{
    readonly _1min: number,
    readonly _5min: number,
    readonly _10min: number
};

interface MemPresure
{
    readonly _1min: number,
    readonly _5min: number,
    readonly _10min: number
};

interface HardWareStatus
{
    readonly cpu: CPUPresure,
    readonly memery: MemPresure
};

interface QueStatus
{
    readonly notReady: number,//由于评测文件尚未加载等尚不能开始评测的任务数
    readonly ready: number,//已经准备好但还未开始评测的任务数
    readonly running: number,//正在运行中的任务数
    readonly toSubmit: number,//已经评测结束等待提交结果的任务数
    readonly total: number//所有尚未提交的任务数
};

interface JudgerHeartBeat extends JudgerMessage
{
    readonly time: Date,
    readonly nextHeartBeat: number,//发送下一次心跳的间隔
    readonly hardWareStatus: HardWareStatus,
    readonly queStatus: QueStatus
};

interface HeartBeatResponse extends Response
{
    readonly newHeartBeatInterval?: number
};

const enum CachePolicy
{
    DISABLE,
    SHORT,
    LONG,
    FORCE,
    INHERIT
};
/*
DISABLE 不要缓存这个文件（比如用户代码）
SHORT 短期缓存这个文件（比如重测有关文件）
LONG 长期缓存这个文件（比如竞赛有关文件）
FORCE 永久缓存这个文件（比如标准比较器）
INHERIT 采用父级别的策略（如题目有关代码和文件采用题目的缓存策略）
 */
type FileURL = string;
interface FileCacheHandle
{
    readonly fileURL: FileURL,
    readonly chacePolicy: CachePolicy,
    readonly isZip: boolean,
    readonly fileContent?: ArrayBuffer | string
};
/*
这是关于评测任务涉及的文件的接口
fileURL是这个文件的唯一标识符，必须满足当fileURL一致时文件内容也一致的约束
cachePolicy的含义见其定义
当不缓存或者可以确定评测机尚未缓存这个文件时（比如上线时的基线测试）可以直接附加文件内容
*/
/*
如果是zip，缓存解压后的文件
*/

type FileHandle = string
/*文件的标识符后缀，实际的标识符应当是 "测试点编号.后缀"
如 FileHandle为 in，对应的就是 6.in 等文件
*/
type PipeHandle = number;
//命名管道的标识符

type IOHandle = PipeHandle | FileHandle;

interface ExcuteableParameter
{
    readonly stdin?: IOHandle,
    readonly stdout?: IOHandle,
    readonly pipes?: Array<IOHandle>,
    readonly argvs?: Array<string>
};
//指定了文件的流向
/*
简单来说，拼接这样的执行串
a.out " ".join([pipe[i] for i in pipes]+ argvs) + <stdin + >stdout 
*/
/*
注意，当 IOHandle 为 FileHandle时，要根据当前评测点进行拼接获得压缩包中的文件名
当 IOHandle为PipeHandle时，应当替换为对应的命名管道的名字
*/

const enum ExcuteableType
{
    C89,
    C99,
    C11,
    CPP03,
    CPP11,
    CPP14,
    CPP17,
    CPP20,
    Python27,
    Python38,
    OpenJDK180,
    // javascript,
    typescript,
    Rust,
    bin
};
//bin 代表是二进制文件，可以直接执行

interface ExcutionLimit
{
    readonly memlimit: number,
    readonly timelimit: number
}
//时空限制，ms，MB

interface Excuteable
{
    readonly type: ExcuteableType,
    readonly file: FileCacheHandle,
    readonly limit: ExcutionLimit,
    readonly cachePolicy: CachePolicy,
    readonly para?: ExcuteableParameter | Array<ExcuteableParameter>,
};
/**
 * @member type 指明类型，是编译的依据
 * @member file 指定了代码文件
 * @member limit 指定了运行这一部分的时空限制
 * @member cachePolicy 指定了对编译的二进制文件的缓存策略
*/

const enum FailPolicy
{
    TEST_ALL,
    ABORT_ON_FIRST_FAIL,
};
/**
 * 评测结果非AC时的策略
 * 不一定要遵守 ABORT_ON_FIRST_FAIL ，因为可以并行评测
 */

type TaskID = number | string;

interface Task
{
    readonly taskID: TaskID,
    readonly pipeCount: number,
    readonly file?: FileCacheHandle,
    readonly filehandles: Array<FileHandle>,
    readonly testCaseCount: number,
    readonly failPolicy: FailPolicy,
    readonly porograms: Array<Excuteable>,
    readonly finalPorogramIndex: number,
    readonly userPorogramIndex: number,
};

/**
 * @member taskID 指定了任务的 ID 在提交结果时用得到。
 * @member pipeCount 指示应当创建多少命名管道
 * @member file 是包含了所有输入输出文件的压缩包
 * @member filehandles 指示了要提取的文件
 * @member testCaseCount 指示测试点数量
 * @member failPolicy 指示评测结果非AC时的策略
 * @member porograms 指示涉及的程序和管道连接关系
 * @member finalPorogramIndex 指示以哪个程序的输出为最终结果
 * @member userPorogramIndex 指示哪个是用户程序（用于CE和RE判定）
 * 以及返回哪个程序的时间和内存结果
 */

const enum JudgeResultCode
{
    ACCEPT,
    //接受
    WRONGANSWER,
    //比较器拒绝接受
    TLE,
    //用户程序没有在规定时间内结束
    MLE,
    //用户程序使用了过多的内存
    OLE,
    //用户程序输出超限
    RE,
    //用户程序异常终止或返回值不为0
    CE,
    //用户程序编译失败
    CTLE,
    //用户程序编译超时
    CMLE,
    //用户程序在编译期使用了过多的内存
    CFLE,
    //用户程序编译过程中使用的硬盘空间过大
    SYSTLE,
    //用户程序以外的程序运行超时（如spj）
    SYSMLE,
    //用户程序以外的程序使用了过多的内存（如spj）
    SYSOLE,
    //用户程序以外的程序输出超限
    SYSRE,
    //用户程序以外的程序异常终止或返回值不为0（如spj）
    SYSCE,
    //用户程序以外的程序编译异常（包括CE/CTLE/CMLE/CFLE)
    UNJUDGED,
    //由于各种原因没有评测
};

interface SinglePointResult
{
    readonly status: JudgeResultCode,
    readonly finalOutPut: string,
    // readonly message?:string, //未定具体字段名
    readonly mem: number,
    readonly time: number,
};

interface JudgeResult extends JudgerMessage
{
    readonly taskID: TaskID,
    readonly testCaseCount: number,
    readonly results: Array<SinglePointResult>
};

interface QueryFile extends JudgerMessage
{
    readonly fileURL: FileURL,
    readonly taskID: TaskID,
}

interface FileResponse extends Response, FileCacheHandle
{
    readonly fileContent: ArrayBuffer | string
}