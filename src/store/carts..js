import { defineStore } from 'pinia'
import { reactive } from 'vue'

const useCatsStore = defineStore('cart', {
  state: () => ({
    list: [
      {
        shop_num: 'jx245943342382',
        shop_name: '测试商店',
        shop_icon: '',
        is_business: 1,
        freight_fee: '0.51',
        shopcar: [
          {
            shopcar_id: 25,
            quantity: 2,
            goods_id: 4,
            pack_num: 'ZT20200510001',
            title: '莴苣炒肉丝',
            price: '9.90',
            is_putaway: 1,
            img_url: 'http://wbfile.aicanwang.cn//cpbmp/bz/ZT20200510001.jpg',
            img_middle_url: '',
            img_min_url: '',
          },
          {
            shopcar_id: 24,
            quantity: 1,
            goods_id: 1,
            pack_num: 'wjh20200920001',
            title: '湘西腊肉',
            price: '19.90',
            is_putaway: 1,
            img_url: 'http://wbfile.aicanwang.cn//cpbmp/bz/wjh20200920001.jpg',
            img_middle_url: '',
            img_min_url: '',
          },
        ],
      },
      {
        shop_num: 'jx245943342381',
        shop_name: '测试商店',
        shop_icon: '',
        is_business: 1,
        freight_fee: '0.51',
        shopcar: [
          {
            shopcar_id: 25,
            quantity: 2,
            goods_id: 4,
            pack_num: 'ZT20200510001',
            title: '莴苣炒肉丝',
            price: '9.90',
            is_putaway: 1,
            img_url: 'http://wbfile.aicanwang.cn//cpbmp/bz/ZT20200510001.jpg',
            img_middle_url: '',
            img_min_url: '',
          },
          {
            shopcar_id: 24,
            quantity: 1,
            goods_id: 1,
            pack_num: 'wjh20200920001',
            title: '湘西腊肉',
            price: '19.90',
            is_putaway: 1,
            img_url: 'http://wbfile.aicanwang.cn//cpbmp/bz/wjh20200920001.jpg',
            img_middle_url: '',
            img_min_url: '',
          },
        ],
      },
    ],
  }),
  getters: {
    getTheSelectedStore(state) {
      return (id) => state.list.filter((_ = _.shop_num === id))
    },
  },
  actions: {},
})

export default useCatsStore
