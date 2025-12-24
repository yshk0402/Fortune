import fs from "fs";
import path from "path";

const rokumeiNames = [
  "金星人＋",
  "金星人－",
  "木星人＋",
  "木星人－",
  "水星人＋",
  "水星人－",
  "火星人＋",
  "火星人－",
  "土星人＋",
  "土星人－",
  "天王星人＋",
  "天王星人－",
];

const mbtis = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
];

const failureBase = [
  "頼まれごとを断れず、体力が枯渇する",
  "完璧さばかり追いすぎて、決定するタイミングを逃す",
  "気づかいで本音を後回しにして、ストレスが溜まる",
  "「全部自分でやる」が癖になり、誰にも任せられない",
  "人の期待に応えることに追われ、何が自分の願いかわからなくなる",
  "不安を感じたまま進めないで、時間だけが過ぎていく",
  "うまくいかない現実を「自分のせい」と斜めに受け止める",
  "疲れを我慢して動き続けた結果、あとから一気に崩れる",
  "優先順位が曖昧で、重要な人間関係に注力できない",
  "「やらねば」が先立って、思考が固まってしまう",
];

const avoidanceBase = [
  "「断る予定」を週明けに先に書き込み、自分を守る",
  "朝の30分を計画に割り当て、決断までの時間を短縮",
  "やることを3つに絞り、できないときは手放す",
  "一呼吸置いてから返信し、感情を整える時間を確保",
  "週末に自分と約束する「ゆっくり時間」を必ず入れる",
  "頼られる前に「負荷が高いか」を見積もり直す",
  "気になる案件をノートに書いて、リセットしてから取り組む",
  "一度「保留」にして、翌日に視界を整えて決める",
];

const reliefText = "あなたが悪いのではなく、今年は『やり方が合っていなかった』だけです。";
const cautionOptions = ["1月", "3月", "5月", "7月", "9月", "11月"];
const stageOptions = [
  {
    name: "種子",
    desc: "物事を始める芽吹きの年。新しい計画には慎重な種まきが必要",
    type: "start",
  },
  {
    name: "緑生",
    desc: "成長期。支援が増え伸びるが勢いに頼りすぎると揺らぎやすい",
    type: "growth",
  },
  {
    name: "立花",
    desc: "方向性が定まる重要な時期。土台を固めると後が楽になる",
    type: "setup",
  },
  {
    name: "健弱",
    desc: "小殺界にあたる時期。健康やエネルギーに注意が必要",
    type: "caution",
  },
  {
    name: "達成",
    desc: "目標達成のタイミング。空亡が現れるため油断は禁物",
    type: "peak",
  },
  {
    name: "乱気",
    desc: "中殺界。精神的な波が出やすく、ひと息置いてから判断する",
    type: "caution",
  },
  {
    name: "再会",
    desc: "第二のスタート。失敗を挽回して弾みをつける",
    type: "restart",
  },
  {
    name: "財成",
    desc: "富が入りやすい。用神が生旺するタイミングを活かす",
    type: "growth",
  },
  {
    name: "安定",
    desc: "現状維持の年。新しい挑戦は翌年の大殺界に響くので慎重に",
    type: "steady",
  },
  {
    name: "陰影",
    desc: "大殺界の始まり。冬の初期で新しいことは禁忌",
    type: "big-kai",
  },
  {
    name: "停止",
    desc: "大殺界の真ん中。日常が止まりやすいため、変化は控える",
    type: "big-kai",
  },
  {
    name: "減退",
    desc: "大殺界の終わり。冬の後期で、再起を考え始めてよい",
    type: "big-kai",
  },
];

function hash(seed) {
  let value = 0;
  for (const char of seed) {
    value = (value * 131 + char.charCodeAt(0)) % 1000;
  }
  return value;
}

function pickFrom(list, seed, count) {
  const results = [];
  const used = new Set();
  let cursor = hash(seed);

  while (results.length < count) {
    const index = (cursor + results.length) % list.length;
    cursor += 7;
    if (used.has(index)) {
      continue;
    }
    used.add(index);
    results.push(list[index]);
  }

  return results;
}

function pickMonths(seed, count) {
  const choices = [];
  const cursor = hash(seed);
  for (let i = 0; i < count; i += 1) {
    const index = (cursor + i * 5) % cautionOptions.length;
    choices.push(cautionOptions[index]);
  }
  return choices;
}

function createEntry(rokumei, mbti) {
  const stage = stageOptions[hash(`${rokumei}-${mbti}-stage`) % stageOptions.length];
  const guard = stage.type === "big-kai" ? "大殺界の影響に注意しつつ" : "流れを整えながら";
  const emphasis = mbti.includes("J") ? "決断" : "余裕";
  const focus = mbti.includes("F") ? "人" : "成果";
  const yearSummary = `六命占術${rokumei}×${mbti}は、${stage.name}の年です。${stage.desc}、${guard} ${emphasis}と${focus}の両方を守ることが鍵です。`;

  const failurePatterns = pickFrom(failureBase, `${rokumei}-${mbti}-failure`, 3);
  const avoidanceActions = pickFrom(avoidanceBase, `${rokumei}-${mbti}-avoid`, 3);
  const months = pickMonths(`${rokumei}-${mbti}-caution`, 2);
  const otherRokumei =
    rokumeiNames[(rokumeiNames.indexOf(rokumei) + mbtis.indexOf(mbti) + 3) % rokumeiNames.length];
  const otherMbti = mbtis[(mbtis.indexOf(mbti) + 5) % mbtis.length];
  const difficultTypes = [`${rokumei}×${mbti}`, `${otherRokumei}×${otherMbti}`];

  return {
    free: {
      year_summary: yearSummary,
      failure_patterns: failurePatterns,
      anxiety_line: `「これでいいのかな」が増えるほど、空気を読むことに力を使いすぎています。`,
      cta_text: "回避方法を見る（¥980）",
    },
    paid: {
      avoidance_actions: avoidanceActions,
      caution_months: months,
      difficult_types: difficultTypes,
      relief_text: reliefText,
    },
  };
}

const content = {
  default: {
    free: {
      year_summary: "まずは六命占術の本命を確認し、今年の大殺界を意識してください。",
      failure_patterns: [
        "頼まれごとを抱え込みすぎて、自分の時間がなくなる",
        "完璧な条件を待って、決断が遅れる",
      ],
      anxiety_line: "大殺界の気配があると、気持ちがザワついて動きにくくなります。",
      cta_text: "回避方法を見る（¥980）",
    },
    paid: {
      avoidance_actions: [
        "アップデートしたルールを3つ決める",
        "週の初めに「断る時間」を先に押さえる",
        "大殺界中は決断を48時間保留してから返す",
      ],
      caution_months: ["1月", "3月"],
      difficult_types: ["金星人＋×ESTJ", "木星人－×INFP"],
      relief_text: reliefText,
    },
  },
};

for (let i = 1; i <= 12; i += 1) {
  const rokumei = rokumeiNames[i - 1];
  const rokumeiKey = String(i);
  content[rokumeiKey] = {};
  for (const mbti of mbtis) {
    content[rokumeiKey][mbti] = createEntry(rokumei, mbti);
  }
}

const outputPath = path.resolve(process.cwd(), "content", "content.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(content, null, 2) + "\n");
