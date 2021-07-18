export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 二次弹窗, 命令方式调用
    $confirmBox(title, message, handleConfirm, handleCancel, options) {
      const {
        confirmButtonText = "确认",
        showCancelButton = true,
        // eslint-disable-next-line no-unused-vars
        confirmButtonType = "primary",
      } = options || {};
      return this.$messageBox({
        title,
        message,
        showCancelButton, // 根据业务需求扩展
        confirmButtonText, // 根据业务需求扩展
        customClass: "zk-confirm-box",
        closeOnClickModal: false,
        confirmValidate: (action, component, done, instance) => {
          // component : 自定义传入的component的组件实例
          if (action === "cancel") {
            if (handleCancel) {
              handleCancel();
            }
            return done();
          } else {
            instance.confirmButtonLoading = true;
          }
          handleConfirm(done, instance);
        },
      }).catch(() => {});
    },
    // 可扩展自定义弹窗内容, 给components传自定义组件即可
    $messageBox({
      component = null,
      componentName = "",
      confirmData = {},
      confirmValidate = () => {},
      ...rest
    }) {
      const h = this.$createElement;
      return new Promise((resolve, reject) => {
        this.$msgbox({
          message: h(component, {
            props: { confirmData },
          }),
          beforeClose: (action, instance, done) => {
            const cptInstance = instance.$children.find((child) => {
              return child.$options.name === componentName;
            });
            confirmValidate(action, cptInstance, done, instance);
          },
          ...rest,
        })
          .then(resolve)
          .catch(reject);
      });
    },
    // 修改通知的默认时间
    $toast(type, msg, duration, callback) {
      this.$message({
        type: type,
        message: msg,
        duration: duration || 1500,
        onClose: callback,
      });
    },
    getParams(type = "params", key) {
      const params = this.$route[type];
      if (Object.keys(params).length) {
        if (key) {
          return params[key];
        } else {
          return params;
        }
      } else {
        return null;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    goto(name, params = {}, isReplace) {
      params = params || {};
      return new Promise((resolve) => {
        if (name) {
          if (name.indexOf("/") >= 0) {
            if (isReplace) {
              this.$router.replace(
                {
                  path: name,
                  params,
                },
                () => {
                  resolve && resolve();
                }
              );
            } else {
              this.$router.push(
                {
                  path: name,
                  params,
                },
                () => {
                  resolve && resolve();
                }
              );
            }
          } else {
            if (isReplace) {
              this.$router.replace(
                {
                  name,
                  params,
                },
                () => {
                  resolve && resolve();
                }
              );
            } else {
              this.$router.push(
                {
                  name,
                  params,
                },
                () => {
                  resolve && resolve();
                }
              );
            }
          }
        }
      });
    },
  },
};
