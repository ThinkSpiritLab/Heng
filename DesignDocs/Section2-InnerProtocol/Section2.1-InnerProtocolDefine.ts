declare namespace Heng
{
    declare namespace InternalProtocol
    {
        interface BasicMessage
        {
            id: number;
            type: MessageType;
            body: unknown;
        }

        export enum MessageType
        {
            Ack = 1,
            Version = 2,
            Verify = 3,
            JudgerInfo = 4,

            StatusRequest = 17,
            StatusReport = 18,

            JudgeRequest = 33,
            JudgeResponse = 34,

            Shutdown = 126,
            Error = 127,
        }

        export interface AckMessage extends BasicMessage
        {
            type: MessageType.Ack;
            body: undefined;
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
                keyNumber: number;
                encrypedRandNumber1: string;
            }
            | {
                step: 2;
                decryptedRandNumber1: string;
                encrypedRandNumber2: string;
            }
            | {
                step: 3;
                decryptedRandNumber2: string;
            }
            | {
                step: 4;
                judgerID: string;
                connectionToken: string;
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