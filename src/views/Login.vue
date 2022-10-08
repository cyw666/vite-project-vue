<template>
  <div class="login">
    <div class="login__tip">
      还没有账号，<router-link to="/user/register">快去注册吧~</router-link>
    </div>
    <div class="login__content">
      <h1 class="login__title"><f-logo class="icon" /><span>欢迎登录</span></h1>

      <el-form
        ref="login"
        class="login__form"
        label-position="top"
        label-width="80px"
        :hide-required-asterisk="true"
        :model="form"
        :rules="rules"
        size="large"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码" prop="code">
          <f-code-input
            v-model="form.code"
            :phone="form.phone"
            :validate="validateCode"
            :type="SEND_CODE_TYPE.LOGIN"
          />
        </el-form-item>
        <el-form-item label="">
          <f-button
            round
            block
            type="primary"
            class="login__btn"
            @click="submitForm"
            >登录</f-button
          >
        </el-form-item>
      </el-form>
      <el-divider>或</el-divider>
      <div class="others">
        <div class="others-item">
          <f-icon type="weixin" @click="handleWechatLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { validPhone } from '~/utils/validate'
import { SEND_CODE_TYPE } from '~/utils/constant'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
const login = ref<FormInstance>()
const router = useRouter()
const form = reactive({
  phone: '',
  code: '',
})

const rules: FormRules = {
  phone: [
    {
      validator: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'))
        }
        if (!validPhone(value)) {
          callback(new Error('手机号格式有误'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
}

const submitForm = () => {
  login.value?.validate((valid) => {
    if (valid) {
      userStore.Login(form).then(() => {
        ElMessage.success('登录成功')
        router.push('/center/dashboard')
      })
    } else {
      return false
    }
  })
}

const validateCode = () => {
  return new Promise((resolve, reject) => {
    login.value?.validateField(['phone'], (isValid) => {
      if (isValid) {
        resolve(form.phone)
      } else {
        reject('手机号验证失败')
      }
    })
  })
}

const handleWechatLogin = () => {}
</script>

<style lang="scss" scoped>
.login {
  padding: 60px 50px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__tip {
    text-align: right;
  }
  &__content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
    margin: 0 auto;
    // padding-top: 120px;
  }
  &__title {
    font-size: 36px;
    font-weight: 700;
    color: #721d0f;
    display: flex;
    align-items: center;
    margin-bottom: 79px;
    .icon {
      margin-right: 24px;
      width: 70px;
      height: 70px;
    }
  }
  .others {
    display: flex;
    justify-content: center;
    align-items: center;
    &-item {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 40px;
      background: #ffffff;
      border: 1px solid rgba(114, 29, 15, 0.08);
      border-radius: 8px;
      font-size: 38px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &__form {
    :deep(.el-form-item__label) {
      font-size: 14px;
      font-weight: 500;
      color: #43444d;
      padding: 0;
    }
    :deep(.el-input__validateIcon) {
      display: none;
    }
  }
}
@media screen and (max-width: 768px) {
  .login {
    padding: 20px 30px;
    &__content {
      width: 100%;
      margin: 0;
    }
    &__title {
      margin: 38px 0;
    }
    &__btn {
      margin-top: 20px;
      padding: 11px 20px;
    }
  }
}
</style>
