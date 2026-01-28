// ================================================
// Constructor Function لكل منتج
// ================================================
function Product(data) {
  this.id          = data.id;
  this.name        = data.name;
  this.brand       = data.brand;
  this.price       = data.price;
  this.currency    = data.currency || "USD";
  this.category    = data.category;
  this.image       = data.image;
  this.hoverImage  = data.hover_image_url || data.image; // صورة الـ hover
  this.description = data.description || "";

  // طريقة ترجع HTML الكارت
  this.render = function () {
    return `
 <div class="product-grid-item">
      <div class="product-card">
        <!-- الصورة -->
        <div class="product-img-wrapper">
          <img
            src="${this.image}"
            class="product-img"
            alt="${this.name}"
            data-hover="${this.hoverImage}"
          />
        </div>

        <!-- المحتوى -->
        <div class="product-content">
          <div>
            <h6 class="product-title">${this.name}</h6>
            <p class="product-brand">${this.brand}</p>
            <p class="product-price">$${this.price.toFixed(2)} ${this.currency}</p>
          </div>
          <button class="product-btn">Choose options</button>
        </div>
      </div>
    </div>
    `;
  };
}

// ================================================
// دالة ترندر قسم كامل (عنوان + كروت)
// ================================================
function renderCategory(categoryName, products) {
  const cardsHTML = products.map(p => p.render()).join('');
  const sectionId = categoryName.toLowerCase().replace(/\s+/g, '-');

  return `
    <section id="${sectionId}" class="mb-5 pb-5">
      <h2 class="text-center mb-4 fw-bold" style="color: var(--primary-color);">
        ${categoryName}
      </h2>
      <div class="row g-4">
        ${cardsHTML}
      </div>
    </section>
  `;
}

// ================================================
// الدالة الرئيسية: جلب الداتا + ترندر
// ================================================
function loadAndRenderProducts() {
  fetch('../scripts/product.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`خطأ ${response.status} - الملف غير موجود أو المسار غلط`);
      }
      return response.json();
    })
    .then(data => {
      const allProducts = data.products;

      // تحويل كل منتج إلى instance من Product
      const productInstances = allProducts.map(item => new Product(item));

      // تجميع المنتجات حسب الـ category
      const categories = {};
      productInstances.forEach(prod => {
        const cat = prod.category;
        if (!categories[cat]) {
          categories[cat] = [];
        }
        categories[cat].push(prod);
      });

      // بناء HTML كل الأقسام
      const main = document.querySelector('main');
      let html = '';

      Object.keys(categories).forEach(catName => {
        html += renderCategory(catName, categories[catName]);
      });

      main.innerHTML = html;

      // =======================================
      // تأثير hover: تغيير الصورة عند المرور بالماوس
      // =======================================
      document.querySelectorAll('.product-img').forEach(img => {
        const originalSrc = img.src;
        const hoverSrc = img.dataset.hover;

        if (hoverSrc && hoverSrc !== originalSrc) {
          img.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
          });

          img.addEventListener('mouseleave', () => {
            img.src = originalSrc;
          });
        }
      });
    })
    .catch(error => {
      console.error('خطأ في جلب أو معالجة product.json:', error);

      document.querySelector('main').innerHTML = `
        <div class="alert alert-danger text-center p-5 my-5">
          <h3>حدث خطأ أثناء تحميل المنتجات</h3>
          <p>${error.message}</p>
          <hr>
          <p class="mb-1">تأكدي من:</p>
          <ul class="text-start mx-auto" style="max-width: 450px;">
            <li>الملف اسمه <strong>product.json</strong> (مش products.json)</li>
            <li>موجود في مجلد <strong>scripts</strong></li>
            <li>بتفتحي الصفحة بـ <strong>Live Server</strong> أو سيرفر محلي (مش double-click)</li>
            <li>المسار في fetch صحيح: <code>../scripts/product.json</code></li>
          </ul>
        </div>
      `;
    });
}

// نفذ الدالة لما الصفحة تحمل كاملة
document.addEventListener('DOMContentLoaded', loadAndRenderProducts);



