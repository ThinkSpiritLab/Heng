declare namespace Heng
{
    declare namespace InternalProtocol
    {
        type MessageID = number | string;
        interface BasicMessage
        {
            id: MessageID; // 消息的标识符
            type: MessageType; // 消息的种类
            body: unknown; // 消息携带的其它信息
        }

        export enum MessageType
        {
            Ack = 1, // 对其它消息的确认
            Version = 2, // 声明所支持的协议版本号
            Verify = 3, // 身份认证消息
            JudgerInfo = 4, // 评测端自述消息

            StatusRequest = 17, // 状态请求
            StatusReport = 18, // 状态消息（心跳或经请求）

            JudgeRequest = 33, // 评测任务消息
            JudgeResponse = 34, // 评测结果消息

            Shutdown = 126, // 系统软关闭命令
            Error = 127, // 出错了
        }

        export interface AckMessage extends BasicMessage
        {
            type: MessageType.Ack;
            body: { replyTo?: MessageID, message?: Message };
        }

        type Version = string;

        export interface VersionMessage extends BasicMessage
        {
            type: MessageType.Version;
            body: Version[];
        }

        export type VerifyPayload =
            | {
                step: 1;
                keyNumber: number; // 评测端的密钥号
                encrypedRandNumber1: string; // 用控制端公钥加密的数字
            }
            | {
                step: 2;
                decryptedRandNumber1: string; // 用评测端公钥加密的解密结果
                encrypedRandNumber2: string; // 用评测端公钥加密的数字
            }
            | {
                step: 3;
                decryptedRandNumber2: string; // 用控制端公钥加密的解密结果
            }
            | {
                step: 4;
                judgerID: string; // 发放一个全局唯一的评测端id
                connectionToken: string; // 发放会话用的令牌
            };

        export interface VerifyMessage extends BasicMessage
        {
            type: MessageType.Verify;
            body: VerifyPayload;
        }

        export interface JudgerInfo
        {
            judgerID: string;
            maxTaskCount: number;
            name?: string;
        }

        export interface JudgerInfoMessage extends BasicMessage
        {
            type: MessageType.JudgerInfo;
            body: JudgerInfo;
        }

        export interface CpuUsage
        {
            percentage: number;
            recent?: {
                [minute: number]: number;
            };
        }

        export interface MemoryUsage
        {
            percentage: number;
            recent?: {
                [minute: number]: number;
            };
        }

        export interface HardwareStatus
        {
            cpu: CpuUsage;
            memory: MemoryUsage;
        }

        export interface TaskStatus
        {
            preparing: {
                downloading: number;
                readingCache: number;
            };
            pending: number;
            running: number;
            finished: number;
            total: number;
        }

        type TimeString = string;

        export interface StatusReportPayload
        {
            time: TimeString;
            nextReportTime: TimeString;
            hardware: HardwareStatus;
            task: TaskStatus;
        }

        export interface StatusRequestPayload
        {
            setReportInterval?: number;
            immediate: boolean;
        }

        export interface StatusRequestMessage extends BasicMessage
        {
            type: MessageType.StatusRequest;
            body: StatusRequestPayload;
        }

        export interface StatusReportMessage extends BasicMessage
        {
            type: MessageType.StatusReport;
            body: StatusReportPayload;
        }

        export type Message =
            | AckMessage
            | VersionMessage
            | VerifyMessage
            | JudgerInfoMessage
            | StatusRequestMessage
            | StatusReportMessage;
        // TODO

        export type File = {
            id: string;
            hashsum?: string;
        } & (
                | {
                    authorization?: string;
                    url: string | string[];
                }
                | {
                    content: string;
                }
            );

        export enum JudgeType
        {
            Normal = "normal",
            Special = "special",
            Interactive = "interactive",
        }
        export enum TestPolicy
        {
            Fuse = "fuse",
            All = "all",
        }
        interface Limit
        {
            // 运行：内存、时间、输出
            // 编译: 内存、时间、输出(标准流、生成文件）

            runtime: {
                memory: number;
                cpuTime: number;
                output: number;
            };
            compiler: {
                memory: number;
                cpuTime: number;
                output: number;
                message: number;
            };
        }

        interface Excuteable
        {
            source: File;
            environment: string; // how to compile or excute
            limit: Limit;
        }

        type DynamicFile =
            | {
                type: "builtin";
                name: string; // "user_source" "user_bin"
            }
            | {
                type: "remote";
                file: File;
                name: string;
            };

        type Judge =
            | {
                type: JudgeType.Normal;
                user: Excuteable;
            }
            | {
                type: JudgeType.Special;
                user: Excuteable;
                spj: Excuteable;
            }
            | {
                type: JudgeType.Interactive;
                user: Excuteable;
                interactor: Excuteable;
            };

        export interface JudgeRequest
        {
            taskId: string;

            data: File; // zip

            dynamicFiles: DynamicFile[]; // provide ["user_source","user_bin"]

            judge: Judge;

            test: {
                cases: {
                    input: string; // file path or dynamic file identifier
                    output: string; // file path or dynamic file identifier
                }[];

                policy: TestPolicy; // 全部/短路
            };
        }
    }
}