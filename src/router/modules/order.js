const order = [
  {
    id: '1',
    parentId: '0',
    name: 'OrderIndex',
    path: '',
    component: 'OrderIndex',
    meta: { title: '我的订单', icon: 'icon-overview' },
  },
  {
    id: '2',
    parentId: '0',
    name: 'OrderDetail',
    path: 'detail',
    component: 'OrderDetail',
    meta: { title: '订单详情', icon: 'icon-overview', isHideSideNav: true },
  },
]

export default order
