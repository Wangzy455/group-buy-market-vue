<template>
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">探索时尚与品质的完美结合</h1>
          <p class="hero-subtitle">精选全球优质商品，为您打造极致购物体验</p>
          <router-link to="/products" class="btn btn-primary hero-btn">
            开始购物
            <el-icon class="icon"><ArrowRight /></el-icon>
          </router-link>
        </div>
      </section>
      
      <section class="features container">
        <h2 class="section-title">为什么选择我们</h2>
        
        <div class="features-grid">
          <div class="feature-card">
            <el-icon class="feature-icon"><Truck /></el-icon>
            <h3>全球配送</h3>
            <p>无论您身在何处，我们都能将商品送达您手中</p>
          </div>
          
          <div class="feature-card">
            <el-icon class="feature-icon"><ShieldCheck /></el-icon>
            <h3>品质保证</h3>
            <p>所有商品经过严格筛选，确保品质</p>
          </div>
          
          <div class="feature-card">
            <el-icon class="feature-icon"><Service /></el-icon>
            <h3>7/24客服</h3>
            <p>随时为您解答问题，提供专业服务</p>
          </div>
          
          <div class="feature-card">
            <el-icon class="feature-icon"><RefreshRight /></el-icon>
            <h3>30天退换</h3>
            <p>30天内无理由退换，购物无忧</p>
          </div>
        </div>
      </section>
      
      <section class="trending container">
        <h2 class="section-title">热门商品</h2>
        
        <div class="product-grid">
          <ProductCard 
            v-for="product in trendingProducts" 
            :key="product.id" 
            :product="product"
          />
        </div>
        
        <div class="view-all">
          <router-link to="/products" class="btn btn-secondary">查看全部商品</router-link>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { ArrowRight, Truck, ShieldCheck, Service, RefreshRight } from '@element-plus/icons-vue';
  import ProductCard from '../components/ProductCardComponent.vue';
  import axios from 'axios';
  
  const trendingProducts = ref([]);
  
  onMounted(async () => {
    try {
      // 这里可以替换为实际的API接口
      const response = await axios.get('/api/products/trending');
      trendingProducts.value = response.data;
    } catch (error) {
      console.error('Failed to fetch trending products:', error);
      // 使用模拟数据
      trendingProducts.value = [
        {
          id: 1,
          name: '时尚休闲连衣裙',
          price: 299,
          originalPrice: 399,
          image: 'https://via.placeholder.com/300x400?text=Dress',
          rating: 4.8,
          reviewCount: 128
        },
        {
          id: 2,
          name: '男士商务皮鞋',
          price: 499,
          originalPrice: 699,
          image: 'https://via.placeholder.com/300x400?text=Shoes',
          rating: 4.6,
          reviewCount: 95
        },
        {
          id: 3,
          name: '智能手表',
          price: 899,
          originalPrice: 1299,
          image: 'https://via.placeholder.com/300x400?text=Watch',
          rating: 4.9,
          reviewCount: 210
        },
        {
          id: 4,
          name: '高级耳机',
          price: 599,
          originalPrice: 799,
          image: 'https://via.placeholder.com/300x400?text=Headphones',
          rating: 4.7,
          reviewCount: 156
        }
      ];
    }
  });
  </script>
  
  <style scoped>
  .hero {
    height: 80vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://via.placeholder.com/1920x1080?text=Fashion+Store');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
  }
  
  .hero-content {
    max-width: 800px;
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
  
  .hero-btn {
    font-size: 1.1rem;
    padding: 12px 30px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  .icon {
    font-size: 1.2rem;
  }
  
  .features {
    padding: 5rem 0;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .feature-card {
    text-align: center;
    padding: 2rem;
    background-color: var(--light-gray);
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
  }
  
  .feature-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .trending {
    padding: 5rem 0;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .view-all {
    text-align: center;
  }
  </style>