<template>
    <div class="product-card card">
      <div class="product-image">
        <img :src="product.image" :alt="product.name">
        <div class="product-tags">
          <span v-if="isDiscounted" class="tag discount-tag">
            {{ discountPercentage }}% OFF
          </span>
          <span v-if="product.isNew" class="tag new-tag">NEW</span>
        </div>
        <div class="product-actions">
          <el-button 
            type="primary" 
            circle 
            @click="addToCart(product)"
            :disabled="isInCart"
          >
            <el-icon v-if="isInCart"><Check /></el-icon>
            <el-icon v-else><ShoppingCart /></el-icon>
          </el-button>
          <el-button 
            type="info" 
            circle
            @click="$router.push(`/products/${product.id}`)"
          >
            <el-icon><View /></el-icon>
          </el-button>
        </div>
      </div>
      
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        
        <div class="product-rating">
          <el-rate 
            v-model:="product.rating" 
            disabled 
            text-color="#ff9900"
            :score-template="product.rating"
          />
          <span class="review-count">({{ product.reviewCount }})</span>
        </div>
        
        <div class="product-price">
          <span class="current-price">¥{{ product.price }}</span>
          <span v-if="isDiscounted" class="original-price">¥{{ product.originalPrice }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

// ✅ 正确解包 ref
const cart = inject('cart');
const addToCart = inject('addToCart');

const isDiscounted = computed(() => {
  return props.product.originalPrice && props.product.originalPrice > props.product.price;
});

const discountPercentage = computed(() => {
  if (!isDiscounted.value) return 0;
  return Math.round((1 - props.product.price / props.product.originalPrice) * 100);
});

// ✅ 使用 cart.value 并添加类型检查
const isInCart = computed(() => {
  return Array.isArray(cart.value) && 
         cart.value.some(item => item.id === props.product.id);
});
  </script>
  
  <style scoped>
  .product-card {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .product-image {
    position: relative;
    overflow: hidden;
    height: 300px;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .product-card:hover .product-image img {
    transform: scale(1.05);
  }
  
  .product-tags {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .tag {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .discount-tag {
    background-color: var(--danger-color);
    color: white;
  }
  
  .new-tag {
    background-color: var(--success-color);
    color: white;
  }
  
  .product-actions {
    position: absolute;
    bottom: -50px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    transition: bottom 0.3s ease;
  }
  
  .product-card:hover .product-actions {
    bottom: 0;
  }
  
  .product-info {
    padding: 15px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .product-name {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--text-color);
  }
  
  .product-rating {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  
  .review-count {
    margin-left: 5px;
    font-size: 0.8rem;
    color: var(--dark-gray);
  }
  
  .product-price {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .current-price {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--primary-color);
  }
  
  .original-price {
    font-size: 0.9rem;
    color: var(--dark-gray);
    text-decoration: line-through;
  }
  </style>