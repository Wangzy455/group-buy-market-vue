<template>
  <header class="navbar">
    <div class="container navbar-container">
      <div class="navbar-logo">
        <router-link to="/">
          <h1>ShopVue</h1>
        </router-link>
      </div>
      
      <nav class="navbar-menu">
        <router-link to="/" class="navbar-link">首页</router-link>
        <router-link to="/products" class="navbar-link">商品</router-link>
        <router-link to="/cart" class="navbar-link">
          购物车
          <el-badge v-if="cart.length" :value="cartItemCount" class="cart-badge" />
        </router-link>
        
        <div class="navbar-user" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <router-link v-if="isLoggedIn" to="/profile" class="navbar-link">
            {{ user.name || '个人中心' }}
          </router-link>
          <span v-else class="navbar-link" @click="showLoginDialog = true">未登录</span>
          
          <transition name="dropdown">
            <div v-if="showDropdown && isLoggedIn" class="navbar-dropdown">
              <router-link to="/orders" class="dropdown-item">我的订单</router-link>
              <div class="dropdown-item" @click="handleLogout">退出</div>
            </div>
          </transition>
        </div>
      </nav>
    </div>

    <!-- 登录对话框 -->
    <el-dialog
      v-model="showLoginDialog"
      title=" "
      width="800px"
      :show-close="false"
      custom-class="login-dialog"
    >
      <div class="login-content">
        <!-- 左侧文字区 -->
        <div class="login-text">
          <h3>欢迎来到ShopVue商城</h3>
          <ul class="feature-list">
            <li><el-icon><Check /></el-icon> 每日上新1000+精选商品</li>
            <li><el-icon><Check /></el-icon> 正品保障·假一赔十</li>
            <li><el-icon><Check /></el-icon> 拼团购买享受多重优惠</li>
            <li><el-icon><Check /></el-icon> 7天无理由退换货</li>
            <li><el-icon><Check /></el-icon> 专属客服快速响应</li>
            <li><el-icon><Check /></el-icon> 多端同步购物车</li>
          </ul>
        </div>

        <!-- 右侧二维码区 -->
        <div class="qr-section">
          <div class="qr-code">
            <img id="qr-code-img" src="" alt="微信扫码登录">
            <p class="qr-tip">微信扫码一键登录</p>
          </div>
          
          <!-- 协议同意 -->
          <div class="agreement">
            扫码默认您已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <el-link type="primary">隐私政策</el-link>
          </div>
        </div>
      </div>
    </el-dialog>
  </header>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Check } from '@element-plus/icons-vue';

const router = useRouter();
const isLoggedIn = ref(false);
const user = ref(null);
const cart = inject('cart');
const logout = inject('logout');

const showDropdown = ref(false);
const showLoginDialog = ref(false); // 控制登录对话框的显示

const cartItemCount = computed(() => {
  return cart.reduce((total, item) => total + item.quantity, 0);
});

const handleLogout = () => {
  logout();
  localStorage.removeItem('loginToken');
  localStorage.removeItem('user');
  user.value = null;
  isLoggedIn.value = false;
  showDropdown.value = false;
  router.push('/');
};

// 持久化登录状态
function setLoginToken(token) {
  localStorage.setItem('loginToken', token);
}

function getLoginToken() {
  return localStorage.getItem('loginToken');
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// 生成微信二维码逻辑
const generateQRCode = () => {
  fetch('http://localhost:8092/mall/login/weixin_qrcode_ticket')
    .then(response => response.json())
    .then(data => {
      if (data.code === "0000") {
        const ticket = data.data;
        const qrCodeImg = document.getElementById('qr-code-img');
        qrCodeImg.src = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`;

        // 开始轮询检查登录状态
        const intervalId = setInterval(() => {
          checkLoginStatus(ticket, intervalId);
        }, 1000); // 每1秒检查一次
      } else {
        console.error('获取二维码 ticket 失败:', data.info);
        alert('获取二维码失败，请稍后再试。如果问题持续存在，请检查链接的合法性或稍后重试。');
      }
    })
    .catch(error => {
      console.error('请求失败:', error);
      alert('请求失败，请检查网络或稍后再试。如果问题持续存在，请检查链接的合法性。');
    });
};

const checkLoginStatus = (ticket, intervalId) => {
  fetch(`http://localhost:8092/mall/login/check_login?ticket=${ticket}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.code === "0000") {
        // 登录成功
        clearInterval(intervalId); // 清除轮询
        console.log('登录成功:', data.data);
        // 更新用户状态
        user.value = data.data;
        isLoggedIn.value = true;
        setLoginToken(data.data);
        setUser(data.data);
        showLoginDialog.value = false;
        alert('登录成功，欢迎回来！');
      } else if (data.code === "1001") {
        // 用户未扫码或未确认
        console.log('用户未扫码或未确认');
      } else {
        // 其他错误
        console.error('登录失败:', data.info);
      }
    })
    .catch(error => {
      console.error('检查登录状态失败:', error);
    });
};

// 在页面加载时恢复登录状态
onMounted(() => {
  const token = getLoginToken();
  const userInfo = getUser();
  if (token && userInfo) {
    user.value = userInfo;
    isLoggedIn.value = true;
  } else {
    showLoginDialog.value = true;
    generateQRCode();
  }
});
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.navbar-logo h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
}

.navbar-link:hover {
  color: var(--primary-color);
}

.navbar-user {
  position: relative;
}

.navbar-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 150px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}

.dropdown-item {
  padding: 0.75rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  display: block;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: var(--light-gray);
  color: var(--primary-color);
}

.cart-badge {
  margin-left: 4px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 登录对话框样式 */
.login-dialog {
  border-radius: 12px;
  overflow: hidden;
  
  :deep(.el-dialog__header) {
    padding: 0;
  }
  
  :deep(.el-dialog__body) {
    padding: 0;
  }
}

.login-content {
  display: flex;
  height: 500px;
}

.login-text {
  flex: 1;
  padding: 40px;
  background: #f8f9fa;
  
  h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
  }
  
  .feature-list {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 18px;
      font-size: 16px;
      color: #666;
      display: flex;
      align-items: center;
      
      .el-icon {
        color: var(--primary-color);
        margin-right: 8px;
      }
    }
  }
}

.qr-section {
  width: 300px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .qr-code {
    text-align: center;
    
    img {
      width: 200px;
      height: 200px;
      margin-bottom: 15px;
    }
    
    .qr-tip {
      color: #666;
      font-size: 14px;
    }
  }
  
  .agreement {
    margin-top: auto;
    text-align: center;
    
    .el-checkbox {
      white-space: pre-wrap;
    }
    
    .el-link {
      margin: 0 3px;
    }
  }
}
</style>