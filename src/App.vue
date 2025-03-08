<template>
  <div class="app-container">
    <Navbar></Navbar>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import Navbar from './components/NavbarComponent.vue';
import Footer from './components/FooterComponent.vue';

// 全局状态管理
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));
const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'));

// 提供给所有组件使用
provide('isLoggedIn', isLoggedIn);
provide('user', user);
provide('cart', cart);

// 登录方法
const login = (userData) => {
  isLoggedIn.value = true;
  user.value = userData;
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('user', JSON.stringify(userData));
};

// 登出方法
const logout = () => {
  isLoggedIn.value = false;
  user.value = {};
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.setItem('user', '{}');
};

// 添加到购物车
const addToCart = (product) => {
  const existingProduct = cart.value.find(item => item.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.value.push({
      ...product,
      quantity: 1
    });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

// 从购物车移除
const removeFromCart = (productId) => {
  cart.value = cart.value.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

// 更新购物车商品数量
const updateCartQuantity = (productId, quantity) => {
  const product = cart.value.find(item => item.id === productId);
  if (product) {
    product.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart.value));
  }
};

// 提供方法给所有组件使用
provide('login', login);
provide('logout', logout);
provide('addToCart', addToCart);
provide('removeFromCart', removeFromCart);
provide('updateCartQuantity', updateCartQuantity);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #3a86ff;
  --secondary-color: #ff006e;
  --accent-color: #8338ec;
  --text-color: #333;
  --light-gray: #f8f9fa;
  --medium-gray: #e9ecef;
  --dark-gray: #6c757d;
  --success-color: #38b000;
  --warning-color: #ffbe0b;
  --danger-color: #ff5a5f;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text-color);
  background-color: #fff;
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #2a75e6;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn-secondary:hover {
  background-color: #e0005c;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  text-align: center;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>