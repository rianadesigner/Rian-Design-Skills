const P0 = "/images/page0";

export default function SlidePage0() {
  return (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden bg-[#f8f8f8]"
      style={{ fontFamily: "'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      {/* ── Header: Logo + 标语 ─────────────────────────────────── */}
      <div className="flex shrink-0 items-center gap-3 px-10 pt-[30px]">
        <img src={`${P0}/logo-2.svg`} alt="" width={32} height={32} className="rounded-full" draggable={false} />
        <p className="text-[20px] text-[#111]">
          <span className="font-medium">心流</span>
          <span className="text-[30px]" style={{ fontFamily: "Caveat, cursive" }}>2.0</span>
          <span className="ml-3 text-[20px]" style={{ fontFamily: "Caveat, cursive" }}>让知识随心流动</span>
        </p>
      </div>

      {/* ── Tab Bar ──────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between px-10 pt-[20px]">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-full bg-[#111] px-4 py-2 text-[12px] font-semibold text-white">
            <img src={`${P0}/icon-tab-all-inner.svg`} alt="" width={16} height={16} className="brightness-0 invert" />
            全部库
          </button>
          <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#333]">
            <img src={`${P0}/icon-tab-star-2.svg`} alt="" width={16} height={16} />
            官方预置
          </button>
          <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#333]">
            <img src={`${P0}/icon-tab-doc-2.svg`} alt="" width={16} height={16} />
            本地导入
          </button>
          <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-[#333]">
            <img src={`${P0}/icon-tab-git-2.svg`} alt="" width={16} height={16} />
            Git同步
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute -right-1 -top-1 h-5 w-[81px] rounded-full bg-gradient-to-r from-pink-400 to-red-400 opacity-60 blur-md" />
            <button className="relative flex items-center gap-1 rounded-full border border-[#5c5cff] bg-[rgba(255,255,255,0.2)] px-4 py-[7px] text-[12px] font-semibold text-white">
              <img src={`${P0}/icon-skill-2.png`} alt="" width={30} height={30} className="absolute left-0 top-[3px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]" />
              <span className="ml-6">安装SKILL</span>
            </button>
          </div>
          <button className="flex size-9 items-center justify-center rounded-full border border-[#f2f3f5] bg-white">
            <img src={`${P0}/icon-setting-2.svg`} alt="" width={16} height={16} />
          </button>
          <button className="flex size-9 items-center justify-center rounded-full border border-[#f2f3f5] bg-white">
            <img src={`${P0}/icon-search-2.svg`} alt="" width={16} height={16} />
          </button>
          <button className="rounded-full border border-[#f2f3f5] bg-[#111] px-4 py-2 text-[12px] font-semibold text-white">
            新建知识库
          </button>
        </div>
      </div>

      {/* ── Center: Knowledge Card ───────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative h-[144px] w-[210px]">
          <div className="absolute left-[32px] -top-[19px] z-10">
            <div
              className="flex items-center gap-1 overflow-hidden rounded-lg px-4 py-2 text-[12px] font-semibold text-white shadow-[0px_2px_4px_rgba(0,0,0,0.25)]"
              style={{ background: "linear-gradient(135deg, #1a1a3e 0%, #2d2b55 50%, #1e1b4b 100%)" }}
            >
              <img src={`${P0}/avatar-horse-3.png`} alt="" width={16} height={16} className="rounded-sm" />
              Happyhorse视频
            </div>
          </div>

          <div className="absolute left-0 -top-[1px] flex h-[60px] w-[106px] items-center justify-center">
            <div style={{ transform: "rotate(15deg)" }}>
              <div className="flex items-center gap-1 rounded-lg bg-[#fffbf0] px-4 py-2 text-[12px] font-semibold text-[#d99921] shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
                <img src={`${P0}/icon-report-gold.svg`} alt="" width={16} height={16} />
                研究报告
              </div>
            </div>
          </div>

          <div className="absolute left-[105px] -top-[1px] flex h-[60px] w-[106px] items-center justify-center">
            <div style={{ transform: "rotate(-15deg)" }}>
              <div className="flex items-center gap-1 rounded-lg bg-[#eefffe] px-4 py-2 text-[12px] font-semibold text-[#158b8c] shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
                <img src={`${P0}/icon-ppt-main.svg`} alt="" width={16} height={16} />
                演示文稿
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-[23px] h-[121px] w-[210px] rounded-3xl bg-[#f8f8f8] shadow-[0px_4px_4px_rgba(0,0,0,0.08)]">
            <img src={`${P0}/card-bg-main.svg`} alt="" className="absolute -inset-[7%_3%_3%_3%] h-[113%] w-[106%] object-contain" draggable={false} />
          </div>
          <p className="absolute left-[24px] top-[68px] text-[16px] font-semibold leading-6 text-[#111]">
            官方推荐
          </p>
          <p className="absolute left-[24px] top-[100px] text-[12px] leading-5 text-[#999]">
            2026-03-15 · 24个来源
          </p>
        </div>
      </div>

      {/* ── Bottom: Action Chips ─────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-center gap-3 pb-[20px]">
        {[
          { icon: "icon-upload-2.svg", label: "本地文件" },
          { icon: "icon-filedir-2.svg", label: "文件目录" },
          { icon: "icon-clipboard-inner.svg", label: "文本粘贴" },
          { icon: "icon-git-2.svg", label: "Git仓库" },
          { icon: "icon-app-2.svg", label: "第三方应用" },
        ].map(({ icon, label }) => (
          <button key={label} className="flex items-center gap-1 rounded-full bg-white px-3 py-2 text-[12px] font-semibold text-[#111] shadow-[0px_2px_8px_rgba(0,0,0,0.1)]">
            <img src={`${P0}/${icon}`} alt="" width={14} height={14} />
            {label}
          </button>
        ))}
      </div>

      {/* ── Bottom: Search Bar ───────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-center px-10 pb-[30px]">
        <div className="flex w-full max-w-[600px] items-center justify-between rounded-full bg-white px-4 py-3 shadow-[0px_4px_12px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.06)]">
          <span className="text-[14px] leading-[22px] text-[rgba(17,17,17,0.5)]">
            请输入你的研究内容
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold text-[#666]">无可选来源</span>
            <div className="flex size-8 items-center justify-center rounded-full bg-[#f0f0f0]">
              <img src={`${P0}/icon-search-btn-2.svg`} alt="" width={16} height={16} />
            </div>
          </div>
        </div>
        {/* View Toggle */}
        <div className="ml-3 flex items-center rounded-full bg-[#f0f0f0] px-1 py-1">
          <div className="flex items-center gap-1 rounded-full bg-white px-4 py-2 shadow-[0px_1px_3px_rgba(0,0,0,0.08)]">
            <img src={`${P0}/icon-grid-2.svg`} alt="" width={14} height={14} />
            <span className="text-[14px] leading-[22px] text-[#111]">网格</span>
          </div>
          <div className="flex items-center px-4 py-2">
            <span className="text-[14px] leading-[22px] text-[#111]">图谱</span>
          </div>
        </div>
      </div>
    </div>
  );
}
