import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Live from "../views/Live.vue";
import Upcoming from "../views/Upcoming";
import Match from "../views/Match";

import Login from "../views/Login";
import Register from "../views/Register";

import Casino from "../views/Casino";
import Virtual from "../views/Virtual";

import ChangePassword from "../views/ChangePassword";
import Deposit from "../views/Deposit/index";
import DepositViaShop from "../views/Deposit/Via-Shop"
import DepositViaMobileMoney from "../views/Deposit/MobileMoney"
import Withdraw from "../views/Withdraw";
import Transactions from "../views/Transactions";

import Messages from "../views/Messages";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title:
        "Capital Bet",
      metaTags: [
        {
          name: "title",
          content:
            "Capital Bet",
        },
        {
          property: "og:url",
          content: "capitalbet.ug",
        },
        {
          property: "og:type",
          content: "Website",
        },
      ],
    },
  },
  {
    path: "/live",
    name: "Live",
    component: Live,
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: Upcoming,
  },
  {
    path: "/sport/:status/:event_id/:name",
    name: "match",
    component: Match,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/casino",
    name: "casino",
    component: Casino,
  },
  {
    path: "/virtual",
    name: "virtual",
    component: Virtual,
  },
  {
    path: "/account",
    name: "account",
    component: ChangePassword,
  },
  {
    path: "/deposit",
    name: "deposit",
    component: Deposit,
  },
  {
    path: "/deposit/shop",
    name: "deposit-via-shop",
    component: DepositViaShop,
  },
  {
    path: "/deposit/mobile-money",
    name: "deposit-via-mobile-money",
    component: DepositViaMobileMoney,
  },
  {
    path: "/withdraw",
    name: "withdraw",
    component: Withdraw,
  },
  {
    path: "/transactions",
    name: "transactions",
    component: Transactions,
  },
  {
    path: "/messages",
    name: "messages",
    component: Messages,
  },
  {
    path: "/bets",
    component: () => import("../views/Bets"),
    redirect: "/bets/open",
    children: [
      {
        path: "open",
        component: () => import("../views/Bets/Open"),
      },
      {
        path: "settled",
        component: () => import("../views/Bets/Settled"),
      },
      {
        path: "virtuals",
        component: () => import("../views/Bets/Virtuals"),
      },
      {
        path: "jackpots",
        component: () => import("../views/Bets/Jackpots"),
      },
    ],
  },
  {
    path: "/betlist/:id",
    name: "bet-info",
    component: () => import("../views/Bets/bet-info"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
