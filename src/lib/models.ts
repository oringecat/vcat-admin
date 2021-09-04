/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-09-03
 */

//响应状态码
export enum ResponseCode {
    Success = 100, //成功
    Error = 101, //发生错误
    Fail = 102, //失败
    Warning = 103, //非法请求
    Unauthorized = 201, //授权失败
    ParameterError = 202, //参数错误
    InvalidToken = 203, //令牌无效
    InvalidSign = 204, //签名无效
}