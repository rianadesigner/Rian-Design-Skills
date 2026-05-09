import React, { useMemo, useState } from "react";
import {
  MuxBreadcrumb,
  MuxButton,
  MuxCard,
  MuxChart,
  MuxNavAside,
  MuxSearchArea,
  MuxSimpleTable,
  MuxStatistic,
  MuxTag,
} from "@alife/mux-components";

const { MenuItem } = MuxNavAside;

// ── 模拟数据 ──────────────────────────────────────
const chartData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map(
  (xfield) => ({
    xfield,
    gmv: Math.round(5e4 + Math.random() * 6e4),
    orders: Math.round(300 + Math.random() * 300),
    uv: Math.round(1000 + Math.random() * 2000),
  }),
);

const allRows = [
  { id: 1, shop: "旗舰店 A", category: "flagship", gmv: 428_900, orders: 1920, uv: 8430, refundRate: 2.1, status: "投放中" },
  { id: 2, shop: "专营店 B", category: "specialty", gmv: 315_200, orders: 1455, uv: 6210, refundRate: 3.4, status: "投放中" },
  { id: 3, shop: "卖场店 C", category: "store", gmv: 289_400, orders: 1203, uv: 5100, refundRate: 1.8, status: "已暂停" },
  { id: 4, shop: "专卖店 D", category: "specialty", gmv: 156_700, orders: 887, uv: 3320, refundRate: 4.2, status: "投放中" },
  { id: 5, shop: "集合店 E", category: "store", gmv: 93_100, orders: 512, uv: 2180, refundRate: 2.9, status: "已结束" },
  { id: 6, shop: "旗舰店 F", category: "flagship", gmv: 531_200, orders: 2341, uv: 10200, refundRate: 1.5, status: "投放中" },
  { id: 7, shop: "专营店 G", category: "specialty", gmv: 198_400, orders: 1020, uv: 4500, refundRate: 3.1, status: "已暂停" },
];

const InitialSearch = { shopName: "", shopType: "", dateRange: ["", ""] as [string, string] };

const statusColor: Record<string, string> = {
  投放中: "green",
  已暂停: "orange",
  已结束: "gray",
};

export function MerchantReportPage() {
  const [navActive, setNavActive] = useState(["report", "overview"]);
  const [searchValues, setSearchValues] = useState(InitialSearch);
  const [activeMetric, setActiveMetric] = useState("gmv");

  // ── 搜索区域配置（MuxSearchArea Demo 风格）──────────
  const searchItems = useMemo(
    () => [
      {
        dataKey: "shopName",
        title: "店铺名称",
        dataType: "string" as const,
        placeholder: "请输入店铺名",
      },
      {
        dataKey: "shopType",
        title: "店铺类型",
        dataType: "select" as const,
        dataProps: {
          dataSource: [
            { label: "旗舰店", value: "flagship" },
            { label: "专营/专卖", value: "specialty" },
            { label: "卖场/集合", value: "store" },
          ],
        },
      },
      {
        dataKey: "dateRange",
        title: "统计时间",
        dataType: "dateRange" as const,
      },
    ],
    [],
  );

  // ── 过滤表格数据 ──────────────────────────────────
  const filteredRows = useMemo(() => {
    return allRows.filter((r) => {
      if (searchValues.shopName && !r.shop.includes(searchValues.shopName)) return false;
      if (searchValues.shopType && r.category !== searchValues.shopType) return false;
      return true;
    });
  }, [searchValues]);

  // ── 图表配置（MuxStatistic.Tab 联动） ─────────────
  const chartOption = useMemo(
    () => ({
      coord: { type: "rect" as const, xAxis: { field: "xfield" } },
      legend: {},
      graphs: [{ type: "line" as const, field: [activeMetric] }],
      tips: {},
    }),
    [activeMetric],
  );

  const statFields = useMemo(
    () => [
      { title: "成交 GMV", key: "gmv", value: 1_284_302, unit: "元", tip: "统计周期内成交金额", formatter: "formatMoney" as const },
      { title: "支付订单", key: "orders", value: 8642, tip: "已支付子订单量" },
      { title: "访客数 UV", key: "uv", value: 38_420, tip: "独立访客数" },
      { title: "退款率", key: "refundRate", value: 2.35, unit: "%", tip: "退款金额/GMV", diffList: [{ text: "环比上周", num: -0.12 }] },
    ],
    [],
  );

  // ── 表格列定义 ───────────────────────────────────
  const columns = useMemo(
    () => [
      { title: "店铺", dataIndex: "shop", width: 140, lock: "left" as const },
      { title: "类型", dataIndex: "category", width: 90,
        cell: (v: unknown) => ({ flagship: "旗舰店", specialty: "专营/专卖", store: "卖场/集合" }[v as string] ?? "-") },
      { title: "GMV（元）", dataIndex: "gmv", width: 130,
        cell: (v: unknown) => Number(v).toLocaleString("zh-CN") },
      { title: "订单数", dataIndex: "orders", width: 90,
        cell: (v: unknown) => Number(v).toLocaleString("zh-CN") },
      { title: "UV", dataIndex: "uv", width: 90,
        cell: (v: unknown) => Number(v).toLocaleString("zh-CN") },
      { title: "退款率", dataIndex: "refundRate", width: 90,
        cell: (v: unknown) => `${Number(v).toFixed(1)}%` },
      { title: "状态", dataIndex: "status", width: 90,
        cell: (v: unknown) => (
          <MuxTag color={statusColor[v as string] ?? "gray"} type="fill" shape="square" size="normal">
            {v as string}
          </MuxTag>
        ) },
      {
        title: "操作", width: 130, lock: "right" as const,
        cell: (_v: unknown, _i: number, row: (typeof allRows)[0]) => (
          <>
            <MuxButton size="small" type="link">明细</MuxButton>
            <MuxButton size="small" type="link" onClick={() => console.log("export", row.id)}>导出</MuxButton>
          </>
        ),
      },
    ],
    [],
  );

  // ── 只在概览页展示完整内容，其它菜单 placeholder ─
  const isOverview = navActive.includes("overview");

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f2f3f5", overflow: "hidden" }}>

      {/* ── 侧边导航 ──────────────────────────────── */}
      <MuxNavAside
        title="商家中心"
        active={navActive}
        collapsible
        defaultOpenAll
        isAffix={false}
        onChange={setNavActive}
        style={{ height: "100vh", flexShrink: 0 }}
      >
        <MenuItem icon="home" value="report" label="经营报表">
          <MenuItem value="overview" label="总览" />
          <MenuItem value="shop" label="店铺明细" />
          <MenuItem value="product" label="商品分析" />
        </MenuItem>
        <MenuItem icon="tongji-2" value="adv" label="广告数据">
          <MenuItem value="adv-cost" label="消耗分析" />
          <MenuItem value="adv-roi" label="ROI 报告" />
        </MenuItem>
        <MenuItem
          icon="user"
          value="crowd"
          label="人群资产"
          badge={<MuxTag size="normal" color="red">NEW</MuxTag>}
        />
        <MenuItem icon="shezhi" value="setting" label="账户设置" />
      </MuxNavAside>

      {/* ── 主内容区 ──────────────────────────────── */}
      <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
        <MuxBreadcrumb style={{ marginBottom: 12 }}>
          <MuxBreadcrumb.Item>商家中心</MuxBreadcrumb.Item>
          <MuxBreadcrumb.Item>经营报表</MuxBreadcrumb.Item>
          <MuxBreadcrumb.Item>总览</MuxBreadcrumb.Item>
        </MuxBreadcrumb>

        {isOverview ? (
          <>
            {/* ── 搜索筛选区 ─────────────────────── */}
            <MuxCard style={{ marginBottom: 16 }}>
              <MuxSearchArea
                initialValue={InitialSearch}
                items={searchItems}
                onSearch={(values) => setSearchValues(values as typeof InitialSearch)}
                onReset={() => setSearchValues(InitialSearch)}
              />
            </MuxCard>

            {/* ── KPI 指标 + Statistic.Tab 联动图表 ── */}
            <MuxCard
              title="核心指标"
              extra={
                <>
                  <MuxButton type="secondary" icon="download" style={{ marginRight: 8 }}>导出</MuxButton>
                  <MuxButton type="primary" icon="shuaxin">刷新</MuxButton>
                </>
              }
              style={{ marginBottom: 16 }}
            >
              <MuxStatistic.Tab
                activeValue={activeMetric}
                fields={statFields}
                onChange={(key) => setActiveMetric(key)}
              />
              <MuxCard title="趋势图（近 7 日）" theme="subcard" style={{ marginTop: 12 }}>
                <MuxChart data={chartData} options={chartOption} height={280} />
              </MuxCard>
            </MuxCard>

            {/* ── 店铺明细表 ─────────────────────── */}
            <MuxCard title="店铺明细">
              <MuxSimpleTable
                bodyHeight={320}
                columns={columns}
                dataSource={filteredRows}
                dynamicRowHeight={false}
              />
            </MuxCard>
          </>
        ) : (
          <MuxCard title={navActive[navActive.length - 1]}>
            <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
              此功能页面开发中 — 当前激活菜单：{navActive.join(" / ")}
            </div>
          </MuxCard>
        )}
      </div>
    </div>
  );
}
