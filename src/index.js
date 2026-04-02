// ==================== 农历转换模块 ====================
const CHINESEYEARCODE = [
  19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632,
  21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450,
  38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104,
  38256, 21234, 18800, 25958, 54432, 59984, 92821, 23248, 11104,
  100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956,
  9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872,
  42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296,
  43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925,
  19152, 42192, 54484, 53840, 54616, 46400, 46752, 103846, 38320,
  18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256,
  19189, 18800, 25776, 29859, 59984, 27480, 23232, 43872, 38613,
  37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680,
  37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416,
  86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726,
  42208, 53856, 60005, 54576, 23200, 30371, 38608, 19195, 19152,
  42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864,
  42359, 42160, 43600, 111189, 27936, 44448, 84835, 37744, 18936,
  18800, 25776, 92326, 59984, 27296, 108228, 43744, 37600, 53987,
  51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972, 21200,
  43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168,
  45683, 26928, 29495, 27296, 44368, 84821, 19296, 42352, 21732,
  53600, 59752, 54560, 55968, 92838, 22224, 19168, 43476, 41680,
  53584, 62034, 54560
];

const CHINESENEWYEAR = [
  "19000131", "19010219", "19020208", "19030129", "19040216", "19050204",
  "19060125", "19070213", "19080202", "19090122", "19100210", "19110130",
  "19120218", "19130206", "19140126", "19150214", "19160203", "19170123",
  "19180211", "19190201", "19200220", "19210208", "19220128", "19230216",
  "19240205", "19250124", "19260213", "19270202", "19280123", "19290210",
  "19300130", "19310217", "19320206", "19330126", "19340214", "19350204",
  "19360124", "19370211", "19380131", "19390219", "19400208", "19410127",
  "19420215", "19430205", "19440125", "19450213", "19460202", "19470122",
  "19480210", "19490129", "19500217", "19510206", "19520127", "19530214",
  "19540203", "19550124", "19560212", "19570131", "19580218", "19590208",
  "19600128", "19610215", "19620205", "19630125", "19640213", "19650202",
  "19660121", "19670209", "19680130", "19690217", "19700206", "19710127",
  "19720215", "19730203", "19740123", "19750211", "19760131", "19770218",
  "19780207", "19790128", "19800216", "19810205", "19820125", "19830213",
  "19840202", "19850220", "19860209", "19870129", "19880217", "19890206",
  "19900127", "19910215", "19920204", "19930123", "19940210", "19950131",
  "19960219", "19970207", "19980128", "19990216", "20000205", "20010124",
  "20020212", "20030201", "20040122", "20050209", "20060129", "20070218",
  "20080207", "20090126", "20100214", "20110203", "20120123", "20130210",
  "20140131", "20150219", "20160208", "20170128", "20180216", "20190205",
  "20200125", "20210212", "20220201", "20230122", "20240210", "20250129",
  "20260217", "20270206", "20280126", "20290213", "20300203", "20310123",
  "20320211", "20330131", "20340219", "20350208", "20360128", "20370215",
  "20380204", "20390124", "20400212", "20410201", "20420122", "20430210",
  "20440130", "20450217", "20460206", "20470126", "20480214", "20490202",
  "20500123", "20510211", "20520201", "20530219", "20540208", "20550128",
  "20560215", "20570204", "20580124", "20590212", "20600202", "20610121",
  "20620209", "20630129", "20640217", "20650205", "20660126", "20670214",
  "20680203", "20690123", "20700211", "20710131", "20720219", "20730207",
  "20740127", "20750215", "20760205", "20770124", "20780212", "20790202",
  "20800122", "20810209", "20820129", "20830217", "20840206", "20850126",
  "20860214", "20870203", "20880124", "20890210", "20900130", "20910218",
  "20920207", "20930127", "20940215", "20950205", "20960125", "20970212",
  "20980201", "20990121", "21000209"
];

function decodeYearCode(yearCode) {
  let monthDays = [];
  for (let i = 5; i <= 16; i++) {
    monthDays.unshift((yearCode >> (i - 1)) & 1 ? 30 : 29);
  }
  const leapMonth = yearCode & 0xf;
  if (leapMonth) {
    const leapDays = (yearCode >> 16) & 1 ? 30 : 29;
    monthDays.splice(leapMonth, 0, leapDays);
  }
  return monthDays;
}

function daysFromNewYear(lunarYear, lunarMonth, lunarDay, leapMonth) {
  const yearCode = CHINESEYEARCODE[lunarYear - 1900];
  const monthDays = decodeYearCode(yearCode);
  const leap = yearCode & 0xf;
  let passed = 0;
  for (let m = 1; m < lunarMonth; m++) {
    passed += monthDays[m - 1];
    if (leap && m === leap && !leapMonth) {
      passed += monthDays[leap];
    }
  }
  if (leap && lunarMonth > leap) {
    passed += monthDays[leap];
  }
  if (leapMonth) {
    passed += monthDays[lunarMonth - 1];
  }
  passed += lunarDay - 1;
  return passed;
}

function toSolarDate(lunarYear, lunarMonth, lunarDay, leapMonth = false) {
  const yearCode = CHINESEYEARCODE[lunarYear - 1900];
  const newYearStr = CHINESENEWYEAR[lunarYear - 1900];
  const newYearDate = new Date(
    newYearStr.slice(0, 4),
    parseInt(newYearStr.slice(4, 6)) - 1,
    newYearStr.slice(6, 8)
  );
  const daysPassed = daysFromNewYear(lunarYear, lunarMonth, lunarDay, leapMonth);
  const resultDate = new Date(newYearDate);
  resultDate.setDate(newYearDate.getDate() + daysPassed);
  return resultDate;
}

// ==================== 辅助函数 ====================
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

async function getJwtSecret(env) {
  if (env.JWT_SECRET) return env.JWT_SECRET;
  let secret = await env.TOKENS.get('jwt_secret');
  if (!secret) {
    secret = crypto.randomUUID().replace(/-/g, '');
    await env.TOKENS.put('jwt_secret', secret);
  }
  return secret;
}

async function generateJWT(payload, secret) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signatureInput));
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

async function verifyJWT(token, secret) {
  try {
    const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const signature = Uint8Array.from(atob(encodedSignature), c => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(signatureInput));
    if (!isValid) return null;
    const payload = JSON.parse(atob(encodedPayload));
    if (payload.exp && payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

// ==================== 认证中间件 ====================
async function authenticate(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);

  const secret = await getJwtSecret(env);
  const jwtPayload = await verifyJWT(token, secret);
  if (jwtPayload && jwtPayload.user_id) {
    const user = await env.DB.prepare('SELECT id, username, role FROM users WHERE id = ?').bind(jwtPayload.user_id).first();
    return user;
  }

  const user = await env.DB.prepare('SELECT id, username, role FROM users WHERE api_key = ?').bind(token).first();
  return user;
}

// ==================== 生日计算 ====================
function nextSolarBirthday(birthDateStr, today) {
  const [year, month, day] = birthDateStr.split('-').map(Number);
  let candidate = new Date(today.getFullYear(), month - 1, day);
  if (candidate < today) {
    candidate = new Date(today.getFullYear() + 1, month - 1, day);
  }
  if (month === 2 && day === 29 && candidate.getMonth() !== 1) {
    candidate = new Date(candidate.getFullYear(), 2, 1);
  }
  return candidate;
}

function nextLunarBirthday(lunarYear, lunarMonth, lunarDay, today) {
  let solar = toSolarDate(today.getFullYear(), lunarMonth, lunarDay);
  if (solar < today) {
    solar = toSolarDate(today.getFullYear() + 1, lunarMonth, lunarDay);
  }
  return solar;
}

// ==================== 通知发送（示例实现） ====================
async function sendWechatApp(config, message) {
  const { corpid, corpsecret, agentid } = config;
  const tokenUrl = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${corpid}&corpsecret=${corpsecret}`;
  const tokenResp = await fetch(tokenUrl);
  const { access_token } = await tokenResp.json();
  const sendUrl = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${access_token}`;
  const body = {
    touser: '@all',
    msgtype: 'textcard',
    agentid,
    textcard: { title: message.title, description: message.content, url: message.url || '' }
  };
  await fetch(sendUrl, { method: 'POST', body: JSON.stringify(body) });
}

// 其他渠道可在此扩展，例如：
// async function sendTelegram(config, message) { ... }

async function sendNotification(channel, context, env) {
  const config = channel.config;
  if (!config) return;
  const message = {
    title: context.title,
    content: context.content,
    url: context.url || ''
  };
  switch (channel.type) {
    case 'wechat_app':
      await sendWechatApp(config, message);
      break;
    // 添加其他类型...
    default:
      console.log(`Unsupported channel type: ${channel.type}`);
  }
}

// ==================== 数据库自动初始化 ====================
let tablesInitialized = false;

async function initTables(env) {
  if (tablesInitialized) return;
  try {
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT,
        api_key TEXT UNIQUE NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `).run();
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS birthdays (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        birth_date TEXT NOT NULL,
        is_solar INTEGER NOT NULL DEFAULT 1,
        phone TEXT,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `).run();
    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS notification_channels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        enabled INTEGER NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `).run();
    tablesInitialized = true;
  } catch (err) {
    console.error('Failed to initialize tables:', err);
  }
}

async function initAdmin(env) {
  const adminUsername = env.ADMIN_USERNAME;
  const adminPassword = env.ADMIN_PASSWORD;
  if (!adminUsername || !adminPassword) return;
  const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(adminUsername).first();
  if (existing) return;
  const passwordHash = await hashPassword(adminPassword);
  const apiKey = crypto.randomUUID().replace(/-/g, '');
  await env.DB.prepare(
    `INSERT INTO users (username, password_hash, role, api_key) VALUES (?, ?, 'admin', ?)`
  ).bind(adminUsername, passwordHash, apiKey).run();
}

// ==================== 定时任务 ====================
async function scheduledCheckAndNotify(env) {
  const users = await env.DB.prepare('SELECT id FROM users').all();
  for (const user of users.results) {
    const birthdays = await env.DB.prepare('SELECT * FROM birthdays WHERE user_id = ?').bind(user.id).all();
    const channels = await env.DB.prepare('SELECT id, type FROM notification_channels WHERE user_id = ? AND enabled = 1').bind(user.id).all();

    for (const birthday of birthdays.results) {
      let nextDate;
      if (birthday.is_solar) {
        nextDate = nextSolarBirthday(birthday.birth_date, new Date());
      } else {
        const [year, month, day] = birthday.birth_date.split('-').map(Number);
        nextDate = nextLunarBirthday(year, month, day, new Date());
      }
      if (!nextDate) continue;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const days = Math.ceil((nextDate - today) / (1000 * 3600 * 24));
      if (days >= 0 && days <= 3) {
        const age = today.getFullYear() - parseInt(birthday.birth_date.slice(0, 4));
        const context = {
          title: `${today.toISOString().slice(0, 10)} 生日提醒`,
          content: `${birthday.name}（${birthday.is_solar ? '阳历' : '农历'}） ${nextDate.toISOString().slice(0, 10)} (${days}天后) 过 ${age} 岁生日`,
          url: 'https://your-domain.com'
        };
        for (const channel of channels.results) {
          const fullChannel = await getChannelConfig(user.id, channel.id, env);
          if (fullChannel && fullChannel.enabled) {
            await sendNotification(fullChannel, context, env);
          }
        }
      }
    }
  }
}

async function getChannelConfig(userId, channelId, env) {
  const channel = await env.DB.prepare(
    'SELECT id, name, type, enabled FROM notification_channels WHERE id=? AND user_id=?'
  ).bind(channelId, userId).first();
  if (!channel) return null;
  const kvKey = `user:${userId}:channel:${channelId}`;
  const configStr = await env.TOKENS.get(kvKey);
  return { ...channel, config: configStr ? JSON.parse(configStr) : {} };
}

// ==================== API 处理 ====================
async function handleLogin(request, env) {
  const { username, password } = await request.json();
  const user = await env.DB.prepare('SELECT id, username, password_hash, role FROM users WHERE username = ?').bind(username).first();
  if (!user) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  const isValid = await hashPassword(password) === user.password_hash;
  if (!isValid) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  const secret = await getJwtSecret(env);
  const token = await generateJWT({
    user_id: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + 7 * 24 * 3600 * 1000
  }, secret);
  return new Response(JSON.stringify({ token, user: { id: user.id, username: user.username, role: user.role } }), { headers: { 'Content-Type': 'application/json' } });
}

async function handleRegister(request, env) {
  const multiUser = env.MULTI_USER === 'true';
  if (!multiUser) return new Response(JSON.stringify({ error: 'Registration disabled' }), { status: 403 });
  const { username, password } = await request.json();
  const existing = await env.DB.prepare('SELECT id FROM users WHERE username = ?').bind(username).first();
  if (existing) return new Response(JSON.stringify({ error: 'Username already exists' }), { status: 409 });
  const passwordHash = await hashPassword(password);
  const apiKey = crypto.randomUUID().replace(/-/g, '');
  const result = await env.DB.prepare(
    `INSERT INTO users (username, password_hash, role, api_key) VALUES (?, ?, 'user', ?)`
  ).bind(username, passwordHash, apiKey).run();
  const userId = result.meta.last_row_id;
  const secret = await getJwtSecret(env);
  const token = await generateJWT({
    user_id: userId,
    username,
    role: 'user',
    exp: Date.now() + 7 * 24 * 3600 * 1000
  }, secret);
  return new Response(JSON.stringify({ token, user: { id: userId, username, role: 'user' } }), { status: 201 });
}

async function handleImport(request, env, userId) {
  const { records } = await request.json();
  let success = 0, errors = [];
  for (const rec of records) {
    try {
      await env.DB.prepare(
        `INSERT INTO birthdays (user_id, name, birth_date, is_solar, phone, note)
         VALUES (?, ?, ?, 1, ?, ?)`
      ).bind(userId, rec.name, rec.birth_date, rec.phone, rec.note).run();
      success++;
      if (rec.lunar_birth_date && rec.lunar_birth_date !== rec.birth_date) {
        await env.DB.prepare(
          `INSERT INTO birthdays (user_id, name, birth_date, is_solar, phone, note)
           VALUES (?, ?, ?, 0, ?, ?)`
        ).bind(userId, rec.name, rec.lunar_birth_date, rec.phone, rec.note).run();
        success++;
      }
    } catch (e) {
      errors.push({ record: rec, error: e.message });
    }
  }
  return new Response(JSON.stringify({ success, errors }), { headers: { 'Content-Type': 'application/json' } });
}

// ==================== 前端 HTML ====================
const HTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>生日提醒系统</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
</head>
<body>
<div id="app" class="container mt-4">
    <div v-if="!token">
        <h2>登录 / 注册</h2>
        <div class="card p-3">
            <div class="mb-3">
                <input v-model="loginUsername" placeholder="用户名" class="form-control">
                <input v-model="loginPassword" type="password" placeholder="密码" class="form-control mt-2">
                <button class="btn btn-primary mt-2" @click="login">登录</button>
            </div>
            <hr>
            <div v-if="multiUser">
                <h4>注册新账号</h4>
                <input v-model="regUsername" placeholder="用户名" class="form-control">
                <input v-model="regPassword" type="password" placeholder="密码" class="form-control mt-2">
                <button class="btn btn-secondary mt-2" @click="register">注册</button>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="d-flex justify-content-between align-items-center">
            <h2>生日提醒系统</h2>
            <button class="btn btn-danger" @click="logout">登出</button>
        </div>
        <ul class="nav nav-tabs mt-3">
            <li class="nav-item"><a class="nav-link" :class="{active: activeTab==='birthdays'}" @click="activeTab='birthdays'" href="#">生日管理</a></li>
            <li class="nav-item"><a class="nav-link" :class="{active: activeTab==='channels'}" @click="activeTab='channels'" href="#">通知渠道</a></li>
        </ul>

        <!-- 生日管理 -->
        <div v-if="activeTab==='birthdays'" class="mt-3">
            <div class="mb-3">
                <button class="btn btn-primary" @click="newBirthday">新增生日</button>
                <button class="btn btn-success" @click="showImportModal">批量导入</button>
            </div>
            <table class="table table-bordered">
                <thead><tr><th>姓名</th><th>生日</th><th>类型</th><th>手机号</th><th>备注</th><th>操作</th></tr></thead>
                <tbody>
                    <tr v-for="b in birthdays" :key="b.id">
                        <td>{{b.name}}</td>
                        <td>{{b.birth_date}}</td>
                        <td>{{b.is_solar ? '阳历' : '农历'}}</td>
                        <td>{{b.phone}}</td>
                        <td>{{b.note}}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" @click="editBirthday(b)">编辑</button>
                            <button class="btn btn-sm btn-danger" @click="deleteBirthday(b.id)">删除</button>
                         </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 通知渠道 -->
        <div v-if="activeTab==='channels'" class="mt-3">
            <button class="btn btn-primary mb-3" @click="newChannel">新增渠道</button>
            <table class="table table-bordered">
                <thead><tr><th>名称</th><th>类型</th><th>启用</th><th>操作</th></tr></thead>
                <tbody>
                    <tr v-for="c in channels" :key="c.id">
                        <td>{{c.name}}</td>
                        <td>{{c.type}}</td>
                        <td>{{c.enabled ? '是' : '否'}}</td>
                        <td>
                            <button class="btn btn-sm btn-warning" @click="editChannel(c)">编辑</button>
                            <button class="btn btn-sm btn-danger" @click="deleteChannel(c.id)">删除</button>
                         </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 编辑生日 Modal -->
        <div v-if="showBirthdayModal" class="modal show d-block" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"><h5>{{ isEditBirthday ? '编辑' : '新增' }}生日</h5><button class="btn-close" @click="closeModal"></button></div>
                    <div class="modal-body">
                        <div class="mb-3"><label>姓名</label><input v-model="birthdayForm.name" class="form-control"></div>
                        <div class="mb-3"><label>生日 (YYYY-MM-DD)</label><input v-model="birthdayForm.birth_date" class="form-control"></div>
                        <div class="mb-3 form-check"><input type="checkbox" v-model="birthdayForm.is_solar" class="form-check-input"><label>阳历生日</label></div>
                        <div class="mb-3"><label>手机号</label><input v-model="birthdayForm.phone" class="form-control"></div>
                        <div class="mb-3"><label>备注</label><textarea v-model="birthdayForm.note" class="form-control"></textarea></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="closeModal">取消</button>
                        <button class="btn btn-primary" @click="saveBirthday">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 编辑渠道 Modal -->
        <div v-if="showChannelModal" class="modal show d-block" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"><h5>{{ isEditChannel ? '编辑' : '新增' }}渠道</h5><button class="btn-close" @click="closeModal"></button></div>
                    <div class="modal-body">
                        <div class="mb-3"><label>渠道名称</label><input v-model="channelForm.name" class="form-control"></div>
                        <div class="mb-3"><label>类型</label>
                            <select v-model="channelForm.type" class="form-control">
                                <option value="wechat_app">企业微信应用</option>
                                <option value="wechat_robot">企业微信机器人</option>
                                <option value="telegram">Telegram Bot</option>
                                <option value="dingtalk">钉钉机器人</option>
                                <option value="feishu">飞书机器人</option>
                                <option value="pushover">Pushover</option>
                                <option value="custom">自定义 Webhook</option>
                            </select>
                        </div>
                        <div class="mb-3 form-check"><input type="checkbox" v-model="channelForm.enabled" class="form-check-input"><label>启用</label></div>
                        <div class="mb-3"><label>配置 (JSON)</label><textarea v-model="channelForm.config" class="form-control" rows="5"></textarea></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="closeModal">取消</button>
                        <button class="btn btn-primary" @click="saveChannel">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 导入 Modal -->
        <div v-if="showImport" class="modal show d-block" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"><h5>批量导入生日</h5><button class="btn-close" @click="closeImport"></button></div>
                    <div class="modal-body">
                        <input type="file" id="csvFile" accept=".csv" class="form-control">
                        <div class="mt-2">CSV 格式：姓名,生日,农历生日,手机号,备注</div>
                        <div class="mt-2"><button class="btn btn-sm btn-secondary" @click="downloadTemplate">下载模板</button></div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" @click="closeImport">取消</button>
                        <button class="btn btn-primary" @click="importData">导入</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showBirthdayModal || showChannelModal || showImport" class="modal-backdrop show"></div>
    </div>
</div>

<script>
new Vue({
    el: '#app',
    data: {
        token: localStorage.getItem('token') || '',
        user: null,
        multiUser: false,
        activeTab: 'birthdays',
        birthdays: [],
        channels: [],
        showBirthdayModal: false,
        showChannelModal: false,
        showImport: false,
        isEditBirthday: false,
        isEditChannel: false,
        birthdayForm: { id: null, name: '', birth_date: '', is_solar: true, phone: '', note: '' },
        channelForm: { id: null, name: '', type: 'wechat_app', enabled: true, config: '{}' },
        loginUsername: '', loginPassword: '',
        regUsername: '', regPassword: ''
    },
    async mounted() {
        await this.loadConfig();
        if (this.token) {
            this.loadData();
        }
    },
    methods: {
        async loadConfig() {
            const res = await fetch('/api/config');
            const data = await res.json();
            this.multiUser = data.multiUser;
        },
        async loadData() {
            const birthdaysRes = await fetch('/api/birthdays', { headers: { Authorization: 'Bearer ' + this.token } });
            if (birthdaysRes.ok) this.birthdays = await birthdaysRes.json();
            const channelsRes = await fetch('/api/channels', { headers: { Authorization: 'Bearer ' + this.token } });
            if (channelsRes.ok) this.channels = await channelsRes.json();
        },
        async login() {
            const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ username: this.loginUsername, password: this.loginPassword }) });
            if (res.ok) {
                const data = await res.json();
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);
                this.loadData();
            } else alert('登录失败');
        },
        async register() {
            const res = await fetch('/api/register', { method: 'POST', body: JSON.stringify({ username: this.regUsername, password: this.regPassword }) });
            if (res.ok) {
                const data = await res.json();
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('token', this.token);
                this.loadData();
            } else alert('注册失败');
        },
        logout() {
            localStorage.removeItem('token');
            this.token = '';
            this.user = null;
        },
        newBirthday() { this.isEditBirthday = false; this.birthdayForm = { id: null, name: '', birth_date: '', is_solar: true, phone: '', note: '' }; this.showBirthdayModal = true; },
        editBirthday(b) { this.isEditBirthday = true; this.birthdayForm = { ...b }; this.showBirthdayModal = true; },
        async saveBirthday() {
            const url = this.isEditBirthday ? '/api/birthdays/' + this.birthdayForm.id : '/api/birthdays';
            const method = this.isEditBirthday ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token }, body: JSON.stringify(this.birthdayForm) });
            if (res.ok) { this.loadData(); this.closeModal(); }
        },
        async deleteBirthday(id) {
            if (confirm('确认删除？')) {
                await fetch('/api/birthdays/' + id, { method: 'DELETE', headers: { Authorization: 'Bearer ' + this.token } });
                this.loadData();
            }
        },
        newChannel() { this.isEditChannel = false; this.channelForm = { id: null, name: '', type: 'wechat_app', enabled: true, config: '{}' }; this.showChannelModal = true; },
        editChannel(c) { this.isEditChannel = true; this.channelForm = { ...c, config: c.config ? JSON.stringify(c.config) : '{}' }; this.showChannelModal = true; },
        async saveChannel() {
            let configObj;
            try { configObj = JSON.parse(this.channelForm.config); } catch(e) { alert('配置不是有效的 JSON'); return; }
            const payload = { ...this.channelForm, config: configObj };
            delete payload.id;
            const url = this.isEditChannel ? '/api/channels/' + this.channelForm.id : '/api/channels';
            const method = this.isEditChannel ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token }, body: JSON.stringify(payload) });
            if (res.ok) { this.loadData(); this.closeModal(); }
        },
        async deleteChannel(id) {
            if (confirm('确认删除？')) {
                await fetch('/api/channels/' + id, { method: 'DELETE', headers: { Authorization: 'Bearer ' + this.token } });
                this.loadData();
            }
        },
        showImportModal() { this.showImport = true; },
        closeImport() { this.showImport = false; },
        closeModal() { this.showBirthdayModal = false; this.showChannelModal = false; this.showImport = false; },
        downloadTemplate() {
            const csv = "姓名,生日,农历生日,手机号,备注\n张三,1990-01-01,,13800000000,同事\n李四,1985-05-20,1985-04-01,13900000000,朋友";
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'birthday_template.csv';
            a.click();
            URL.revokeObjectURL(url);
        },
        async importData() {
            const file = document.getElementById('csvFile').files[0];
            if (!file) { alert('请选择 CSV 文件'); return; }
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    const records = results.data.map(row => ({
                        name: row['姓名'],
                        birth_date: row['生日'],
                        lunar_birth_date: row['农历生日'],
                        phone: row['手机号'],
                        note: row['备注']
                    }));
                    const res = await fetch('/api/import', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + this.token },
                        body: JSON.stringify({ records })
                    });
                    const data = await res.json();
                    alert(`成功导入 ${data.success} 条，失败 ${data.errors.length} 条`);
                    if (data.errors.length) console.error(data.errors);
                    this.loadData();
                    this.closeImport();
                }
            });
        }
    }
});
</script>
<style>
.modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1040; }
.modal { z-index: 1050; }
</style>
</body>
</html>`;

// ==================== 主路由 ====================
export default {
  async fetch(request, env) {
    const url = new URL(request.path);
    const path = url.pathname;

    // 自动初始化数据库表
    await initTables(env);
    await initAdmin(env);

    // 公开路由
    if (path === '/api/login' && request.method === 'POST') {
      return handleLogin(request, env);
    }
    if (path === '/api/register' && request.method === 'POST') {
      return handleRegister(request, env);
    }
    if (path === '/api/config' && request.method === 'GET') {
      return new Response(JSON.stringify({ multiUser: env.MULTI_USER === 'true' }), { headers: { 'Content-Type': 'application/json' } });
    }

    // 需要认证的 API
    const user = await authenticate(request, env);
    if (!user && !path.startsWith('/api/')) {
      // 返回前端页面
      return new Response(HTML, { headers: { 'Content-Type': 'text/html' } });
    }
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 生日 API
    if (path === '/api/birthdays') {
      if (request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM birthdays WHERE user_id = ? ORDER BY id').bind(user.id).all();
        return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
      }
      if (request.method === 'POST') {
        const { name, birth_date, is_solar, phone, note } = await request.json();
        const result = await env.DB.prepare(
          'INSERT INTO birthdays (user_id, name, birth_date, is_solar, phone, note) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(user.id, name, birth_date, is_solar ? 1 : 0, phone || null, note || null).run();
        return new Response(JSON.stringify({ id: result.meta.last_row_id }), { status: 201 });
      }
    }
    if (path.startsWith('/api/birthdays/')) {
      const id = path.split('/')[3];
      if (request.method === 'PUT') {
        const { name, birth_date, is_solar, phone, note } = await request.json();
        await env.DB.prepare(
          'UPDATE birthdays SET name=?, birth_date=?, is_solar=?, phone=?, note=? WHERE id=? AND user_id=?'
        ).bind(name, birth_date, is_solar ? 1 : 0, phone || null, note || null, id, user.id).run();
        return new Response(JSON.stringify({ status: 'ok' }));
      }
      if (request.method === 'DELETE') {
        await env.DB.prepare('DELETE FROM birthdays WHERE id=? AND user_id=?').bind(id, user.id).run();
        return new Response(JSON.stringify({ status: 'ok' }));
      }
    }

    // 渠道 API
    if (path === '/api/channels') {
      if (request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT id, name, type, enabled FROM notification_channels WHERE user_id = ? ORDER BY id').bind(user.id).all();
        return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } });
      }
      if (request.method === 'POST') {
        const { name, type, config, enabled } = await request.json();
        const result = await env.DB.prepare(
          'INSERT INTO notification_channels (user_id, name, type, enabled) VALUES (?, ?, ?, ?)'
        ).bind(user.id, name, type, enabled ? 1 : 0).run();
        const channelId = result.meta.last_row_id;
        const kvKey = `user:${user.id}:channel:${channelId}`;
        await env.TOKENS.put(kvKey, JSON.stringify(config));
        return new Response(JSON.stringify({ id: channelId }), { status: 201 });
      }
    }
    if (path.startsWith('/api/channels/')) {
      const id = path.split('/')[3];
      if (request.method === 'PUT') {
        const { name, type, config, enabled } = await request.json();
        await env.DB.prepare(
          'UPDATE notification_channels SET name=?, type=?, enabled=? WHERE id=? AND user_id=?'
        ).bind(name, type, enabled ? 1 : 0, id, user.id).run();
        if (config) {
          const kvKey = `user:${user.id}:channel:${id}`;
          await env.TOKENS.put(kvKey, JSON.stringify(config));
        }
        return new Response(JSON.stringify({ status: 'ok' }));
      }
      if (request.method === 'DELETE') {
        await env.DB.prepare('DELETE FROM notification_channels WHERE id=? AND user_id=?').bind(id, user.id).run();
        await env.TOKENS.delete(`user:${user.id}:channel:${id}`);
        return new Response(JSON.stringify({ status: 'ok' }));
      }
    }

    // 导入接口
    if (path === '/api/import' && request.method === 'POST') {
      return handleImport(request, env, user.id);
    }

    return new Response('Not Found', { status: 404 });
  },
  async scheduled(event, env, ctx) {
    await initTables(env);
    ctx.waitUntil(scheduledCheckAndNotify(env));
  }
};
