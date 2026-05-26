export interface Project {
  name: string
  description: string
  image?: string
  tags?: string[]
}

// 项目配图
import projectYongliStar from '../assets/project-yongli-star.png'
import projectUnicornIsland from '../assets/project-unicorn-island.jpg'
import projectLaserMarket from '../assets/project-laser-市场开拓从0到1.png'
import projectLaserHandshake from '../assets/project-laser-第一次握手.png'
import projectLaserNetwork from '../assets/project-laser-行业友商合作网络.png'
import projectSanhuanBattery from '../assets/project-sanhuan-battery.png'
import projectSanhuanOptoChip from '../assets/project-sanhuan-optochip.png'
import projectSanhuanWuhan from '../assets/project-sanhuan-wuhan.png'
import projectSanhuanEurope from '../assets/project-sanhuan-europe.png'
import projectSchindlerArchive from '../assets/project-schindler-archive.png'

export interface Experience {
  slug: string
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  tags: string[]
  projects?: Project[]
}

export interface Achievement {
  value: number
  suffix: string
  label: string
  prefix?: string
}

export interface Skill {
  name: string
  level: number
  category: string
}

export interface Education {
  slug: string
  school: string
  degree: string
  period: string
  location: string
  description: string
  achievements: string[]
  tags: string[]
  projects?: Project[]
}

export interface Keyword {
  text: string
  link?: string
}

export interface Profile {
  name: string
  title: string
  subtitle: string
  keywords: Keyword[]
  experiences: Experience[]
  education: Education[]
  achievements: Achievement[]
  skills: Skill[]
  contact: {
    email: string
    linkedin?: string
    wechat?: string
  }
}

const profile: Profile = {
  name: '李心可',
  title: '市场战略研究 | 市场开发',
  subtitle: '复合型战略人才，兼具技术背景（材料科学硕士）+ 市场战略分析 + 大客户销售三重背景，深耕新能源、半导体、低空安防等高端制造领域。德国求学工作及外企管培经历，具备国际视野与跨文化沟通能力。',
  keywords: [
    { text: '市场战略分析', link: '/experience/sanhuan-tech' },
    { text: '大项目销售', link: '/experience/schindler' },
    { text: '新能源', link: '/experience/sanhuan-tech' },
    { text: '半导体', link: '/experience/sanhuan-tech' },
    { text: '低空安防', link: '/experience/zhongke-laser' },
    { text: '跨文化沟通（海外工作经历）', link: '/education/germany-overseas' },
  ],

  experiences: [
    {
      slug: 'zhongke-laser',
      company: '四川中科朗星光电科技有限公司',
      role: '市场经理（低空安防方向 - 激光反无）',
      period: '2025 - 2026',
      description: '公司是国内首家实现激光反无人机设备研发到量产全链条布局的企业，2025 年正式独立组建民用低空安防事业部，负责行业市场研判、客户渠道从零到一开拓、重点项目开发与市场生态搭建。',
      achievements: [
        '从 0 到 1 独立开拓客源，自主对接军工、能源、石化、机场等多行业潜在客户，推动多项潜在项目落地',
        '主导核电、石化、航天系统等重点客户"第一次握手"，精准挖掘核心需求，推进方案对接及报价沟通',
        '搭建同行业友商合作网络，与多家企业建立合作关系，推动资源互通、机会共享，拓宽市场拓展路径',
        '开展低空防御、能源、航空航天、公安等多领域市场规模摸排与调研，为公司市场战略制定提供数据支撑',
        '跟进多项重点潜在项目（含军贸、基建安防、能源领域），推进技术方案编制、报价沟通及招投标前期筹备',
        '参与行业展会与技术推广活动，对接行业专家及重点单位负责人，搜集市场、竞对、政策及产品技术信息',
        '梳理产品迭代方向与核心需求，联动上下游厂商构建有竞争力的整体解决方案',
      ],
      tags: ['市场开拓', '低空安防', '激光反无人机', '客户关系', '战略研判'],
      projects: [
        {
          name: '低空安防市场从0到1开拓',
          description: '独立建立客源渠道，对接军工、能源、石化、机场等多行业客户，推动多项潜在项目进入方案对接及报价阶段。',
          image: projectLaserMarket,
          tags: ['市场开拓', '客户关系'],
        },
        {
          name: '重点行业"第一次握手"',
          description: '主导核电、石化、航天系统等重点客户首次技术对接，精准挖掘安防需求，推进定制化方案编制。',
          image: projectLaserHandshake,
          tags: ['大客户', '方案设计'],
        },
        {
          name: '行业友商合作网络搭建',
          description: '与多家同行业企业建立合作关系，推动资源互通与机会共享，拓宽市场拓展路径。',
          image: projectLaserNetwork,
          tags: ['生态合作'],
        },
      ],
    },
    {
      slug: 'sanhuan-tech',
      company: '成都三环科技有限公司（潮州三环集团）',
      role: '市场战略调研（新材料 / 新能源 / 半导体 / AI 工业化）',
      period: '2023 - 2025',
      description: '所属部门为集团对外市场战略协作部，结合企业技术资源优势，为集团规划新产品新业务，同时支持各生产研发部门的对外资源与技术需求。',
      achievements: [
        '完成多个赛道深度研究支撑集团投资决策：固态电池电解质/硅碳负极、光通信芯片/封装材料/CPO工艺、CMOS芯片/TGV封装/IPD工艺/ABF膜/忆阻器/CMP钻石碟、AI工业化应用、新能源汽车电流传感器/IGBT等',
        '主导落地集团与武汉某高校光通信新材料联合研发合作，是部门首个成功校企合作案例，并节约 50% 合作经费预算',
        '为某核心原材料建立国产供应商评估体系（质量/成本/交期），已锁定供应商计划试样技术对接',
        '为新在研粉体产品开发下游 2 家新客户资源，已完成试样验证预计持续放量供货；导入终端 OLED 头部集团高层客户资源',
        '搭建欧洲工业自动化 AI 企业数据库（触达头部企业数十家），深度联动普华永道、毕马威等顶级海外并购交易咨询机构',
        '建立固态电池、新能源汽车、半导体晶圆厂、欧洲 IDM、国内 OLED 等诸多领域头部企业人脉资源',
      ],
      tags: ['市场战略', '新能源', '半导体', '校企合作', '国产替代', '海外并购'],
      projects: [
        {
          name: '固态电池电解质/硅碳负极研究',
          description: '完成固态电池电解质及硅碳负极材料赛道深度研究，为集团新能源领域投资决策提供技术研判支撑。',
          image: projectSanhuanBattery,
          tags: ['新能源', '战略研究'],
        },
        {
          name: '光通信芯片与封装材料调研',
          description: '覆盖光通信芯片、封装材料、CPO工艺等细分领域，输出完整产业链图谱与技术路线对比分析。',
          image: projectSanhuanOptoChip,
          tags: ['半导体', '产业链分析'],
        },
        {
          name: '武汉高校光通信联合研发合作',
          description: '主导落地集团与武汉某高校光通信新材料联合研发合作，为部门首个成功校企合作案例，节约50%合作经费预算。',
          image: projectSanhuanWuhan,
          tags: ['校企合作', '项目管理'],
        },
        {
          name: '欧洲工业自动化AI并购调研',
          description: '搭建欧洲工业自动化AI企业数据库（触达头部企业数十家），深度联动普华永道、毕马威等顶级海外并购交易咨询机构。',
          image: projectSanhuanEurope,
          tags: ['海外并购', 'AI工业化'],
        },
      ],
    },
    {
      slug: 'schindler',
      company: '迅达（中国）电梯有限公司',
      role: '技术销售工程师（管培轮岗 → 大项目超高层方向）',
      period: '2019 - 2023',
      description: '通过中国区管培计划入职，先后轮岗在用梯服务销售及大项目技术销售。主导超高层项目全周期技术攻坚，统筹客户技术需求对接会，协调设计院完成高层建筑交通流量仿真报告，联动瑞士总部研发中心进行高速电梯风阻-能耗联合仿真。',
      achievements: [
        '主导覆盖 200+ 在用电梯资产的客户价值深耕，通过 CRM 数据建模实现续签率 150%（基准值 100%）、转签率 100%（行业均值 80%）、客户流失率 0%',
        '设计预防性维护-成本优化提案，中标某商业综合体 28 台电扶梯年度维保合同（分公司年度唯一公开招标胜出项目）',
        '负责西南区重要地标项目技术方案及高价值电梯设计，中标项目累计成交金额超 5000 万元',
        '设计智能派梯系统，为成都永立星（250m）/ 成都独角兽岛等超高层项目提供定制化交通流量解决方案',
        '通过技术咨询实现二次销售，在绿地 468 项目中追加 100 万元 VO 订单，客户满意度达 98%',
        '建立大客户技术档案库，支持全国 12+ 分公司，共支持超过 40 个、项目价值超 9 亿元的大项目前期技术规划设计咨询和投标',
      ],
      tags: ['管培生', '大项目销售', '超高层建筑', '技术方案', '投标'],
      projects: [
        {
          name: '成都永立星超高层交通方案',
          description: '为250m超高层建筑设计智能派梯系统，提供定制化交通流量仿真方案，联动瑞士总部研发中心完成高速电梯风阻-能耗联合仿真。',
          image: projectYongliStar,
          tags: ['超高层', '智能派梯'],
        },
        {
          name: '成都独角兽岛定制化交通流量解决方案',
          description: '定制化智能交通流量分析及建模设计，与瑞士集团总部进行难点咨询和对接，提供有竞争力的高端梯配置和价格',
          image: projectUnicornIsland,
          tags: ['定制化方案', '客户满意'],
        },
        {
          name: '大项目技术支持',
          description: '建立大客户技术档案库，支持全国12+分公司，覆盖40+个大项目、总价值超9亿元的前期技术规划设计咨询和投标。',
          image: projectSchindlerArchive,
          tags: ['知识管理', '全国支持'],
        },
      ],
    },
  ],

  education: [
    {
      slug: 'germany-overseas',
      school: '德国弗莱堡大学 (University of Freiburg)',
      degree: '硕士 | 可持续材料专业 — 功能性材料',
      period: '2014 - 2018',
      location: '德国 · 弗莱堡',
      description: '在德国弗莱堡大学攻读可持续材料硕士学位，聚焦功能性材料研究。期间同时在弗劳恩霍夫物理测量技术研究所（IPM）担任研究助理，参与工业用油监测传感器芯片功能涂层的研发。这段经历培养了扎实的科研能力、跨文化团队协作能力以及流利的德语沟通能力。',
      achievements: [
        '硕士论文《复合热电传感器的功能涂层合成及改性》获评 2.3 分（优秀等级）',
        '在弗劳恩霍夫 IPM 研究所参与 Öl monitor 项目，合成并改性用于工业用油监测的热电传感器功能涂层',
        '研究成果发表于期刊 Procedia Engineering：Thermal-electrical Impedance Spectroscopy for Fluid Characterization',
        '掌握基于 3-Omega 法测试液体热导率和电阻抗率的传感器芯片分析方法',
        '研究方向覆盖沸石、生物相容性材料等多种功能材料的合成与表征，以及热电效应研究',
        '在纯德语工作环境中培养了流利的德语书面与口头沟通能力（DSH 认证）',
        '独立完成高分子胶层合成实验的设计、实施与数据分析，对多种工业液体进行 pH 值 / 湿润度测试',
      ],
      tags: ['功能性材料', '热电传感器', '科研发表', '德语DSH', '跨文化协作', '弗劳恩霍夫'],
      projects: [
        {
          name: 'Öl Monitor — 工业用油监测传感器',
          description: '在弗劳恩霍夫 IPM 研究所参与的项目，寻找并合成用于工业用油质地变化监测传感器芯片的功能性涂层，并通过改性优化其性能。该传感器基于 3-Omega 法测试液体热导率和电阻抗率来识别样品。',
          tags: ['传感器研发', '功能涂层', '3-Omega法'],
        },
        {
          name: '学术论文发表',
          description: '研究成果 "Thermal-electrical Impedance Spectroscopy for Fluid Characterization" 发表于国际期刊 Procedia Engineering，聚焦流体表征的热电阻抗光谱分析方法。',
          tags: ['学术发表', '流体表征'],
        },
      ],
    },
  ],

  achievements: [
    { value: 5000, suffix: '万+', label: '累计中标金额' },
    { value: 40, suffix: '+', label: '大项目技术支持' },
    { value: 9, suffix: '亿+', label: '项目总价值覆盖', prefix: '' },
    { value: 150, suffix: '%', label: '合同续签率' },
  ],

  skills: [
    { name: '市场战略研究', level: 95, category: '核心能力' },
    { name: '大客户销售', level: 90, category: '核心能力' },
    { name: '商务谈判', level: 90, category: '核心能力' },
    { name: '项目管理 (PMP)', level: 85, category: '核心能力' },
    { name: 'AI coding', level: 60, category: '核心能力' },
    { name: '数据分析 (Power BI/SQL/Python)', level: 80, category: '专业技能' },
    { name: 'CRM 系统', level: 85, category: '专业技能' },
    { name: '大项目投标经验', level: 90, category: '专业技能' },
    { name: '新能源行业认知', level: 90, category: '行业知识' },
    { name: '半导体产业链', level: 85, category: '行业知识' },
    { name: '低空经济/安防', level: 80, category: '行业知识' },
    { name: '英语（流利）', level: 90, category: '语言能力' },
    { name: '德语（流利）', level: 85, category: '语言能力' },
    { name: '中文（母语）', level: 100, category: '语言能力' },
  ],

  contact: {
    email: 'lxk6490@live.com',
    wechat: 'xianggeregina',
  },
}

export default profile
