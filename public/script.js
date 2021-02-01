const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const hostBus = new Vue();

Vue.component('goods-item', {
    props: ['good'],
    template: `
        <div>
            <h3>Наименование: {{ good.product_name }}</h3>
            <p>Цена: {{ good.price }}</p>
            <button class="add-to-cart-btn" type="button" @click="addToCart">В корзину</button>
        </div>
    `,
    methods: {
        addToCart() {
            hostBus.$emit('add-to-cart', this.good);
        }
    }
});

Vue.component('goods-list', {
    props: ['filteredGoods'],
    template: `
        <div class="goods-list">
            <h2>Каталог товаров</h2>
            <div class="goods-item" v-for="good in filteredGoods">
                <goods-item :good="good"></goods-item>
            </div>
        </div>
    `,
});

const app = new Vue({
    el: '#app',
    template: `<div>
        <header>
            <input type="text" class="goods-search" v-model="searchLine"/>
            <button class="search-button" type="button">Искать</button>
            <button class="cart-button" type="button" @click="isCartVisible = !isCartVisible">Корзина {{ cartItems.length>0 ? '*' : '' }}</button>
        </header>
        <main>
            <div class="cart" v-if="isCartVisible">
                <h2 v-if="isCartEmpty">Корзина пуста</h2>
                <h2 v-else>Корзина (всего товаров {{ cartAmount }} на сумму: {{ cartSumm }})
                <button v-if="!isCartEmpty" class="clear-cart-btn" type="button" @click="cartItems=[]">Очистить</button></h2>
                <div class="cart-item" v-for="(good, idx) in cartItems">
                    <h3>Наименование: {{ good.product_name }}</h3>
                    <p>Цена: {{ good.price }}</p>
                    <p>Количество: <button @click="delFromCart(idx)">-</button>{{ good.amount}}<button @click="good.amount++">+</button></p>          
                    <p>Сумма: {{ good.price*good.amount }}</p>
                    <button class="del-from-cart-btn" type="button" @click="delFromCart(idx)">Удалить</button>
                </div>
            </div>
            <goods-list :filteredGoods="filteredGoods" @add-to-cart="addToCart"></goods-list>
        </main></div>`,
    data: {
      goods: [],
      searchLine: '',
      cartItems: [],
      isCartVisible: false,
    },
    methods: {
        makeGETRequest(url, callback) {
        
            var xhr;
        
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
            } else if (window.ActiveXObject) { 
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    setTimeout(() =>
                        callback(xhr.responseText), 0);
                }
            }
        
            xhr.open('GET', url, true);
            xhr.send();
        },
        addToCart(good) {
            if (!this.cartItems.some((gd) => {
                if (gd.id_product === good.id_product) {
                    gd.amount++;
                    return true;
                }
            })) {
                this.cartItems.push({ ...good, amount: 1 });
            }
        },
        delFromCart(idx) {
            this.cartItems[idx].amount--;
            if (this.cartItems[idx].amount === 0) {
                this.cartItems.splice(idx, 1);
            }
        }
    },
    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            return this.goods.filter((good) => good.product_name.match(regexp));
        },
        cartSumm() {
            return this.cartItems.reduce((summ, good) => summ+good.amount*good.price, 0);
        },
        cartAmount() {
            return this.cartItems.reduce((summ, good) => summ+good.amount, 0);
        },
        isCartEmpty() {
            return this.cartItems.length === 0;
        }
    },
    created() {
        hostBus.$on('add-to-cart', this.addToCart);
    },
    beforeDestroy() {
        hostBus.$off('add-to-cart');
    },
    mounted() {
        this.makeGETRequest(`/catalogData.json`, (goods) => {
            console.log(goods);
            this.goods = JSON.parse(goods);
        });
    },    
});