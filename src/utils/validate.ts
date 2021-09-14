/*!
 * ©teamwei.com
 * author: teamwei
 * date: 2021-08-05
 */

import { CompatVue, Component } from "vue";

//表单验证规则
const validateRules: { [key: string]: { reg: RegExp; message: string } } = {
    required: {
        reg: /\S/,
        message: "必填项不能为空",
    },
    password: {
        reg: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{8,64}$/,
        message: "密码不符合规则",
    },
    phone: {
        reg: /^$|^1[3456789]\d{9}$/,
        message: "手机号码无效",
    },
    email: {
        reg: /^$|^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
        message: "邮箱地址无效",
    },
    en: {
        reg: /^[A-Za-z]+$/,
        message: "只能输入英文字母（不允许空格）",
    },
    enname: {
        reg: /^[a-zA-Z0-9_]{1,}$/,
        message: "只能输入英文字母、数字、下划线",
    },
};

interface IParams {
    rules: string;
    minlength?: number;
    maxlength?: number;
    minnumber?: number;
    maxnumber?: number;
    message?: string;
}

const validateTools = (el: HTMLInputElement, params: IParams) => {
    const strlength = el.value.length;
    el.dataset["validateMessage"] = "ok";

    //验证最小长度
    if (params.minlength !== undefined) {
        if (strlength < params.minlength) {
            el.dataset["validateMessage"] =
                params.message || "不能少于" + params.minlength + "个字符";
        }
    }

    //验证最大长度
    if (params.maxlength !== undefined) {
        if (strlength > params.maxlength) {
            el.dataset["validateMessage"] =
                params.message || "不能大于" + params.maxlength + "个字符";
        }
    }

    //验证最小数值
    if (params.minnumber !== undefined) {
        const value = Number(el.value);
        if (isNaN(value)) {
            el.value = "";
            el.dataset["validateMessage"] = "只能输入数值";
        } else {
            if (value < params.minnumber) {
                el.dataset["validateMessage"] =
                    params.message || "数值不能小于" + params.minnumber;
            }
        }
    }

    //验证最大数值
    if (params.maxnumber !== undefined) {
        const value = Number(el.value);
        if (isNaN(value)) {
            el.value = "";
            el.dataset["validateMessage"] = "只能输入数值";
        } else {
            if (value < params.maxnumber) {
                el.dataset["validateMessage"] =
                    params.message || "数值不能大于" + params.maxnumber;
            }
        }
    }

    //验证规则
    if (params.rules) {
        const rules = params.rules.split(".");
        for (let i = 0; i < rules.length; i++) {
            const key = rules[i];
            if (Object.prototype.hasOwnProperty.call(validateRules, key)) {
                const validate = validateRules[key];
                if (!validate.reg.test(el.value)) {
                    el.dataset["validateMessage"] = params.message || validate.message;
                }
            } else {
                el.dataset["validateMessage"] = "无效的规则：" + key;
            }
        }
    }

    if (el.dataset["validateMessage"] == "ok") {
        el.classList.remove("cat-validate-error");
    } else {
        el.classList.add("cat-validate-error");
    }
};

//创建元素
const createElement = (el: HTMLElement, content: string | undefined) => {
    const errorNode = el.nextSibling as HTMLElement;

    if (content) {
        if (errorNode && errorNode.className === "cat-validate-message") {
            errorNode.innerHTML = content;
        } else {
            const node = document.createElement("div");
            node.className = "cat-validate-message";
            node.innerHTML = "<span>" + content + "</span>";

            el.parentNode?.insertBefore(node, errorNode);
        }
    } else {
        removeElement(el);
    }
};

//移除元素
const removeElement = (el: HTMLElement) => {
    const errorNode = el.nextSibling as HTMLElement;

    if (errorNode && errorNode.className === "cat-validate-message") {
        errorNode.remove();
    }
};

const install: Component = (app: CompatVue) => {
    /**
     * 表单验证指令
     * 参数[binding.arg]：元素的标识名称，默认'default',
     * 修饰符[binding.modifiers]：sync 是否即时显示错误提示，默认false
     * 格式：<input v-validate="{ rules: 'required.phone', message: 'error message' }" />
     */
    app.directive("validate", {
        mounted(el, binding) {
            const validateId = binding.arg || "default";
            el.dataset["validate"] = validateId;

            const input: HTMLInputElement = el.querySelector("input") || el;

            input.onfocus = () => {
                removeElement(el);
            };

            //监听change事件
            input.addEventListener("change", () => {
                //验证数据
                validateTools(input, binding.value);

                const button = document.querySelector(
                    `[data-validate-submit='${validateId}']`
                ) as HTMLElement;
                const showErrors = button?.dataset["validateSync"];

                //判断是否显示错误提示
                if (binding.modifiers["sync"] || showErrors === "true") {
                    if (input.dataset["validateMessage"] === "ok") {
                        removeElement(el);
                    } else {
                        createElement(el, input.dataset["validateMessage"]);
                    }
                } else {
                    removeElement(el);
                }
            });
        },
    });

    /**
     * 表单验证提交指令
     * 参数[binding.arg]：关联元素的标识名称，默认'default',
     * 修饰符[binding.modifiers]：sync 是否全局即时显示错误提示，默认false
     * 格式：<input v-validate-submit="Function" />
     */
    app.directive("validateSubmit", {
        mounted(el, binding) {
            const validateId = binding.arg || "default";
            el.dataset["validateSubmit"] = validateId;
            el.dataset["validateSync"] = binding.modifiers["sync"] || false;

            const nodes = document.querySelectorAll(
                `[data-validate='${validateId}']`
            ),
                inputs = Array.from(nodes).map((e) => {
                    const result = e.querySelector("input") || e;
                    return result as HTMLInputElement;
                });

            //绑定onclick事件
            el.onclick = () => {
                const func = binding.value;

                if ({}.toString.call(func) === "[object Function]") {
                    //创建自定义事件
                    const evt = new Event("change", { bubbles: true });
                    inputs.forEach((e) => {
                        //触发自定义事件
                        e.dispatchEvent(evt);
                    });

                    //验证失败消息
                    const result: string[] = inputs.reduce((pre, cur) => {
                        const message = cur.dataset["validateMessage"] || "error";
                        if (message !== "ok") {
                            pre.push(message as never);
                        }
                        return pre;
                    }, []);

                    func(result);
                }
            };
        },
    });
};

export default {
    install,
};
