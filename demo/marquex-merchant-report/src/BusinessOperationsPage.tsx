import type { IMuxGridItemProps } from "@alife/mux-components/es/mux-grid-area";
import React, { useMemo, useState } from "react";
import {
  MuxBannerInfo,
  MuxBreadcrumb,
  MuxButton,
  MuxCard,
  MuxChart,
  MuxGridArea,
  MuxNavAside,
  MuxRankCard,
  MuxSearchArea,
  MuxSimpleTable,
  MuxStatistic,
  MuxTag,
} from "@alife/mux-components";

const { MenuItem } = MuxNavAside;

// ── 近 7 日经营趋势（模拟） ──────────────────────
const trendData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((xfield) => ({
  xfield,
  revenue: Math.round(12e4 + Math.random() * 8e4),
  margin: Math.round(18 + Math.random() * 12),
  orders: Math.round(400 + Math.random() * 250),
  aov: Math.round(210 + Math.random() * 45),
}));

const channelRows = [
  { id: 1, channel: "自然搜索", gmv: 512_300, share: 32.1, yoy: 12.4, level: "高" },
  { id: 2, channel: "信息流投放", gmv: 428_100, share: 26.8, yoy: -3.2, level: "中" },
  { id: 3, channel: "直播/短视频", gmv: 356_800, share: 22.3, yoy: 28.7, level: "高" },
  { id: 4, channel: "会员与复购", gmv: 218_400, share: 13.7, yoy: 5.1, level: "中" },
  { id: 5, channel: "其他", gmv: 81_200, share: 5.1, yoy: 1.2, level: "低" },
];

const rankRows = [
  { id: 1, name: "智能家电套装", gmv: 186_200, mom: 8.2 },
  { id: 2, name: "季节性服饰", gmv: 142_500, mom: 3.1 },
  { id: 3, name: "美妆礼盒", gmv: 119_800, mom: -1.4 },
  { id: 4, name: "家居收纳", gmv: 96_400, mom: 15.6 },
  { id: 5, name: "婴童用品", gmv: 72_100, mom: 6.0 },
];

const InitialSearch = {
  keyword: "",
  region: "",
  dateRange: ["", ""] as [string, string],
};

export function BusinessOperationsPage() {
  const [navActive, setNavActive] = useState(["biz", "dashboard"]);
  const [searchValues, setSearchValues] = useState(InitialSearch);
  const [activeMetric, setActiveMetric] = useState("revenue");
  const searchItems = useMemo(
    () => [
      {
        dataKey: "keyword",
        title: "经营单元 / SKU",
        dataType: "string" as const,
        placeholder: "输入关键词",
      },
      {
        dataKey: "region",
        title: "区域",
        dataType: "select" as const,
        dataProps: {
          dataSource: [
            { label: "全国", value: "" },
            { label: "华东", value: "east" },
            { label: "华南", value: "south" },
            { label: "华北", value: "north" },
          ],
        },
      },
      {
        dataKey: "dateRange",
        title: "统计周期",
        dataType: "dateRange" as const,
      },
    ],
    [],
  );

  const statFields = useMemo(
    () => [
      {
        title: "营业收入",
        key: "revenue",
        value: 1_596_800,
        unit: "元",
        tip: "含已完成订单实收金额",
        formatter: "formatMoney" as const,
        diffList: [{ text: "环比", num: 4.6 }],
      },
      {
        title: "综合毛利率",
        key: "margin",
        value: 24.8,
        unit: "%",
        tip: "（收入−变动成本）/ 收入",
        diffList: [{ text: "目标差值", num: 0.9 }],
      },
      {
        title: "有效订单",
        key: "orders",
        value: 6_842,
        tip: "已支付且未全额退款",
      },
      {
        title: "件单价",
        key: "aov",
        value: 233.5,
        unit: "元",
        tip: "GMV / 子订单数",
        diffList: [{ text: "同比", num: -2.1 }],
      },
    ],
    [],
  );

  const chartOption = useMemo(
    () => ({
      coord: { type: "rect" as const, xAxis: { field: "xfield" } },
      legend: {},
      graphs: [{ type: "line" as const, field: [activeMetric] }],
      tips: {},
    }),
    [activeMetric],
  );

  const rankColumns = useMemo(
    () => [
      { title: "SKU / 类目", dataIndex: "name", width: 160 },
      {
        title: "GMV（元）",
        dataIndex: "gmv",
        width: 110,
        cell: (v: unknown) => Number(v).toLocaleString("zh-CN"),
      },
      {
        title: "环比",
        dataIndex: "mom",
        width: 80,
        cell: (v: unknown) => {
          const n = Number(v);
          const color = n >= 0 ? "green" : "red";
          return (
            <MuxTag color={color} type="fill" shape="square" size="normal">
              {n >= 0 ? "+" : ""}
              {n.toFixed(1)}%
            </MuxTag>
          );
        },
      },
    ],
    [],
  );

  const filteredChannels = useMemo(() => {
    return channelRows.filter((r) => {
      if (searchValues.keyword && !r.channel.includes(searchValues.keyword)) return false;
      return true;
    });
  }, [searchValues.keyword]);

  const channelColumns = useMemo(
    () => [
      { title: "渠道", dataIndex: "channel", width: 140, lock: "left" as const },
      {
        title: "GMV（元）",
        dataIndex: "gmv",
        width: 120,
        cell: (v: unknown) => Number(v).toLocaleString("zh-CN"),
      },
      {
        title: "占比",
        dataIndex: "share",
        width: 90,
        cell: (v: unknown) => `${Number(v).toFixed(1)}%`,
      },
      {
        title: "同比",
        dataIndex: "yoy",
        width: 90,
        cell: (v: unknown) => {
          const n = Number(v);
          return (
            <span style={{ color: n >= 0 ? "#52c41a" : "#ff4d4f" }}>
              {n >= 0 ? "+" : ""}
              {n.toFixed(1)}%
            </span>
          );
        },
      },
      {
        title: "贡献等级",
        dataIndex: "level",
        width: 100,
        cell: (v: unknown) => {
          const map: Record<string, string> = { 高: "green", 中: "orange", 低: "gray" };
          return (
            <MuxTag color={map[v as string] ?? "gray"} type="fill" shape="square" size="normal">
              {v as string}
            </MuxTag>
          );
        },
      },
    ],
    [],
  );

  const gridItems: IMuxGridItemProps[] = useMemo(
    () => [
      {
        children: (
          <MuxCard title="经营趋势（周）" theme="subcard">
            <MuxChart data={trendData} options={chartOption} height={300} />
          </MuxCard>
        ),
      },
      {
        children: (
          <MuxRankCard
            title="热销类目 TOP5"
            desc="按 GMV 排序，环比为上周"
            dataSource={rankRows}
            columns={rankColumns}
            maxBodyHeight={300}
          />
        ),
      },
    ],
    [chartOption, rankColumns],
  );

  const isDashboard = navActive.includes("dashboard");

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f2f3f5", overflow: "hidden" }}>
      <MuxNavAside
        title={
          <span
            style={{
              display: "block",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: 4,
            }}
          >
            <img
              src="/brand-logo.png"
              alt="阿里妈妈·万相台 AI无界"
              style={{
                display: "block",
                width: "100%",
                maxHeight: 44,
                height: "auto",
                objectFit: "contain",
                objectPosition: "left center",
              }}
            />
          </span>
        }
        active={navActive}
        collapsible
        defaultOpenAll
        isAffix
        navBarHeight={0}
        onChange={setNavActive}
        style={{
          height: "100vh",
          flexShrink: 0,
          /** 覆盖组件默认 padding-top:34px，使侧栏与 Logo 贴齐视口顶 */
          padding: "12px 0 32px",
        }}
      >
        <MenuItem icon="home" value="biz" label="经营总览">
          <MenuItem value="dashboard" label="数据看板" />
          <MenuItem value="pnl" label="收支与利润" />
          <MenuItem value="inventory" label="库存周转" />
        </MenuItem>
        <MenuItem icon="tongji-2" value="channel" label="渠道与投放">
          <MenuItem value="channel-mix" label="渠道结构" />
          <MenuItem value="budget" label="预算执行" />
        </MenuItem>
        <MenuItem icon="user" value="customer" label="客户价值" />
        <MenuItem icon="shezhi" value="setting" label="经营设置" />
      </MuxNavAside>

      <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
        <MuxBreadcrumb style={{ marginBottom: 12 }}>
          <MuxBreadcrumb.Item>商业经营</MuxBreadcrumb.Item>
          <MuxBreadcrumb.Item>经营总览</MuxBreadcrumb.Item>
          <MuxBreadcrumb.Item>数据看板</MuxBreadcrumb.Item>
        </MuxBreadcrumb>

        <MuxBannerInfo
          type="success"
          title="经营健康度良好"
          tipContent="综合毛利率高于目标区间；请关注「信息流投放」渠道同比下滑。"
          closable
          style={{ marginBottom: 16 }}
        >
          本周期核心指标达标。建议结合下方「渠道结构」表，优先加投同比正向渠道。
        </MuxBannerInfo>

        {isDashboard ? (
          <>
            <MuxCard style={{ marginBottom: 16 }}>
              <MuxSearchArea
                initialValue={InitialSearch}
                items={searchItems}
                onSearch={(values) => setSearchValues(values as typeof InitialSearch)}
                onReset={() => setSearchValues(InitialSearch)}
              />
            </MuxCard>

            <MuxCard
              title="核心经营指标"
              extra={
                <>
                  <MuxButton type="secondary" icon="download" style={{ marginRight: 8 }}>
                    导出报表
                  </MuxButton>
                  <MuxButton type="primary" icon="shuaxin">
                    同步数据
                  </MuxButton>
                </>
              }
              style={{ marginBottom: 16 }}
            >
              <MuxStatistic.Tab
                activeValue={activeMetric}
                fields={statFields}
                onChange={(key) => setActiveMetric(key)}
              />
              <div style={{ marginTop: 12 }}>
                <MuxGridArea items={gridItems} style={{ gridTemplateColumns: "minmax(0, 1.25fr) minmax(320px, 0.75fr)" }} />
              </div>
            </MuxCard>

            <MuxCard title="渠道结构（本期）">
              <MuxSimpleTable
                bodyHeight={280}
                columns={channelColumns}
                dataSource={filteredChannels}
                dynamicRowHeight={false}
              />
            </MuxCard>
          </>
        ) : (
          <MuxCard title={navActive[navActive.length - 1]}>
            <div style={{ padding: "60px 0", textAlign: "center", color: "#999" }}>
              该模块为占位 — 当前菜单：{navActive.join(" / ")}
            </div>
          </MuxCard>
        )}
      </div>
    </div>
  );
}
