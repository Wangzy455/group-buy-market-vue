<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">关于我们</h3>
            <ul class="footer-links">
              <li><a href="#">公司简介</a></li>
              <li><a href="#">招贤纳士</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">隐私政策</a></li>
              <li><a href="#">服务条款</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">客户服务</h3>
            <ul class="footer-links">
              <li><a href="#">帮助中心</a></li>
              <li><a href="#">配送方式</a></li>
              <li><a href="#">支付方式</a></li>
              <li><a href="#">售后服务</a></li>
              <li><a href="#">常见问题</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">商家合作</h3>
            <ul class="footer-links">
              <li><a href="#">入驻条件</a></li>
              <li><a href="#">商家中心</a></li>
              <li><a href="#">商家培训</a></li>
              <li><a href="#">广告服务</a></li>
              <li><a href="#">平台规则</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3 class="footer-title">关注我们</h3>
            <div class="social-links">
              <a href="#" class="social-link">
                <el-icon><Message /></el-icon>
              </a>
              <a href="#" class="social-link">
                <el-icon><Instagram /></el-icon>
              </a>
              <a href="#" class="social-link">
                <el-icon><Twitter /></el-icon>
              </a>
              <a href="#" class="social-link">
                <el-icon><Youtube /></el-icon>
              </a>
            </div>
            <div class="newsletter">
              <h4>订阅我们的新闻</h4>
              <div class="newsletter-form">
                <el-input placeholder="您的邮箱地址" v-model="email">
                  <template #append>
                    <el-button @click="subscribe">订阅</el-button>
                  </template>
                </el-input>
              </div>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="copyright">
            &copy; {{ new Date().getFullYear() }} ShopVue. 保留所有权利.
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { Message, Instagram, Twitter, Youtube } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  
  const email = ref('');
  
  const subscribe = () => {
    if (!email.value) {
      ElMessage.warning('请输入您的邮箱地址');
      return;
    }
    
    // 这里可以替换为实际的API接口
    ElMessage.success('订阅成功！感谢您的关注');
    email.value = '';
  };
  </script>
  
  <style scoped>
  .footer {
    background-color: #f8f9fa;
    padding: 4rem 0 2rem;
    margin-top: auto;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .footer-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-links li {
    margin-bottom: 0.75rem;
  }
  
  .footer-links a {
    color: var(--dark-gray);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .footer-links a:hover {
    color: var(--primary-color);
  }
  
  .social-links {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--light-gray);
    color: var(--dark-gray);
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  .newsletter h4 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .newsletter-form {
    margin-bottom: 1rem;
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid var(--medium-gray);
  }
  
  .copyright {
    color: var(--dark-gray);
  }
  
  .payment-methods {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .payment-methods img {
    height: 25px;
  }
  
  @media (max-width: 768px) {
    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
  </style>