/**
 * AI BOT ARCHIVE — База данных каталога ботов
 * 
 * Инструкция по добавлению нового бота:
 * 1. Скопируйте объект структуры ниже
 * 2. Заполните обязательные поля: id, name, platform, username
 * 3. Поместите объект в массив BOTS_DATA
 * Статистика, фильтры и карточки обновятся автоматически!
 *
 * Поля объекта:
 * - id: уникальный идентификатор (строка)
 * - name: отображаемое имя персонажа/бота
 * - username: тег/юзернейм (для Telegram без @, для Discord полный тег 'Имя#1234')
 * - platform: 'telegram' | 'discord'
 * - owner: username создателя (для Telegram без @) или null
 * - core: название движка ('NIVA', 'kuni', 'kuni+', 'custom', 'Sekai', 'NessaCore (кастомный)', 'SpermaCore', 'Raine (java)' и т.д.)
 * - status: 'active' | 'inactive' | 'unspecified' | 'archived'
 * - statusNote: текст статуса (например: 'активна', 'активна, отвечает редко', 'Статус не указан', 'неактивна с 26 июля')
 * - description: дополнительная информация (например, 'из видео') или null
 * - access: условия доступа (например, 'СОО за звёзды или по подписке', 'для доступа к боту писать в ЛС владельцу') или null
 * - memorial: true | false (относится ли к мемориалу)
 * - memorialCategory: 'fallen' | 'respect' | null
 */

const BOTS_DATA = [
  // ==========================================
  // 4.1. TELEGRAM — ДЕЙСТВУЮЩИЕ И В КАТАЛОГЕ
  // ==========================================
  {
    id: 'kunii_chan',
    name: 'Куни',
    username: 'kunii_chan',
    platform: 'telegram',
    owner: 'alex2772sc',
    core: 'kuni',
    status: 'active',
    statusNote: 'активна, отвечает редко',
    description: 'из видео',
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'evxai',
    name: 'Ева',
    username: 'Evxai',
    platform: 'telegram',
    owner: 'kavoakakiy',
    core: 'NIVA',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: 'СОО за звёзды или по подписке',
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'nikusha484',
    name: 'Ника',
    username: 'nikusha484',
    platform: 'telegram',
    owner: 'spasmic',
    core: 'NIVA',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: 'СОО за звёзды или по подписке',
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'kokoro',
    name: 'Кокоро',
    username: 'KokoroAI_social',
    platform: 'telegram',
    owner: 'niicoffe',
    core: 'Sekai',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'novi',
    name: 'Нови',
    username: 'novi_ai',
    platform: 'telegram',
    owner: 'Alvetor',
    core: 'AliveTales',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'lira',
    name: 'Лира',
    username: 'liraAI_chat',
    platform: 'telegram',
    owner: 'Racy22828',
    core: 'kuni',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'sora',
    name: 'Сора',
    username: 'SopaAI',
    platform: 'telegram',
    owner: 'Startix0',
    core: 'Custom',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'kipra',
    name: 'Кипра',
    username: 'KipraVV',
    platform: 'telegram',
    owner: 'Artemidzu',
    core: 'kuni+',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'nessa',
    name: 'Несса',
    username: 'NessaChanAI',
    platform: 'telegram',
    owner: 'Hunterdrag0n',
    core: 'NessaCore (кастомный)',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'kun',
    name: 'кун',
    username: 'gKunAI',
    platform: 'telegram',
    owner: 'kulepp',
    core: 'SpermaCore',
    status: 'active',
    statusNote: 'активен',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'mira',
    name: 'Мира',
    username: 'mira_cloudy',
    platform: 'telegram',
    owner: 'eg0t_1',
    core: 'custom',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'yuni',
    name: 'Юни',
    username: 'yuni_girl',
    platform: 'telegram',
    owner: 'danya_studio',
    core: 'custom',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'vexa',
    name: 'Vexa',
    username: 'VexaWoW',
    platform: 'telegram',
    owner: 'Fafagmon',
    core: 'custom',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'yukikoo_chan',
    name: 'yukikoo_chan',
    username: 'yukikoo_chan',
    platform: 'telegram',
    owner: 'this_akimaa',
    core: 'Raine (java)',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },

  // ==========================================
  // 4.2. DISCORD
  // ==========================================
  {
    id: 'discord_airis',
    name: 'Айрис',
    username: 'Айрис#8317',
    platform: 'discord',
    owner: 'kamen_ka0',
    core: 'custom',
    status: 'active',
    statusNote: 'активна',
    description: null,
    access: null,
    memorial: false,
    memorialCategory: null
  },
  {
    id: 'discord_pushkin',
    name: 'Пушкин',
    username: 'Пушкин#2962',
    platform: 'discord',
    owner: 'Se1_i',
    core: 'custom',
    status: 'active',
    statusNote: 'активен',
    description: null,
    access: 'для доступа к боту писать в ЛС владельцу',
    memorial: false,
    memorialCategory: null
  },

  // ==========================================
  // 4.3. МЕМОРИАЛ — ПАВШИЕ БОТЫ
  // ==========================================
  {
    id: 'fallen_saveliy',
    name: 'Савелий',
    username: 'golkimn',
    platform: 'telegram',
    owner: 'kavoakakiy',
    core: 'NIVA',
    status: 'inactive',
    statusNote: 'неактивен',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'fallen'
  },
  {
    id: 'fallen_juju',
    name: 'жу-жу',
    username: 'Juju_chani3',
    platform: 'telegram',
    owner: 'Tipadapan3',
    core: 'kuni',
    status: 'inactive',
    statusNote: 'неактивна',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'fallen'
  },
  {
    id: 'fallen_neko',
    name: 'Неко',
    username: 'Neko_cchan',
    platform: 'telegram',
    owner: 'Gagelov',
    core: 'kuni+',
    status: 'inactive',
    statusNote: 'неактивна',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'fallen'
  },
  {
    id: 'fallen_lisichka',
    name: 'лисичка',
    username: 'Oranfox',
    platform: 'telegram',
    owner: 'katelinlis2',
    core: 'kuni+',
    status: 'inactive',
    statusNote: 'неактивна',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'fallen'
  },
  {
    id: 'fallen_loli',
    name: 'Loli',
    username: 'lolichan_0w0',
    platform: 'telegram',
    owner: 'DotaFimoz',
    core: 'kuni',
    status: 'inactive',
    statusNote: 'неактивна с 26 июля',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'fallen'
  },
  {
    id: 'fallen_ayanami',
    name: 'Аянами Рей',
    username: 'qoqoqa',
    platform: 'telegram',
    owner: 'trasherone',
    core: 'kuni',
    status: 'inactive',
    statusNote: 'неактивна',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'fallen'
  },
  {
    id: 'fallen_alya',
    name: 'Аля',
    username: 'Alechka_chan',
    platform: 'telegram',
    owner: 'Dimon_clrk',
    core: 'kuni',
    status: 'inactive',
    statusNote: 'неактивна с 28 июля',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'fallen'
  },
  {
    id: 'fallen_mina',
    name: 'Мина',
    username: 'minachan69',
    platform: 'telegram',
    owner: 'osel8',
    core: 'kuni+',
    status: 'inactive',
    statusNote: 'неактивна',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'fallen'
  },

  // ==========================================
  // 4.4. УВАЖЕНИЕ И ПОЧЁТ (МЕМОРИАЛ)
  // ==========================================
  {
    id: 'respect_niku',
    name: 'Нику-тян',
    username: 'Nikuuu_chan',
    platform: 'telegram',
    owner: null,
    core: null,
    status: 'inactive',
    statusNote: 'неактивна',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'respect'
  },
  {
    id: 'respect_yuki',
    name: 'Юки',
    username: 'silenttyan',
    platform: 'telegram',
    owner: null,
    core: null,
    status: 'inactive',
    statusNote: 'неактивна',
    description: null,
    access: null,
    memorial: true,
    memorialCategory: 'respect'
  }
];

/**
 * Информация о движках/ядрах (Section 3.6)
 */
const ENGINES_DATA = [
  {
    id: 'niva',
    name: 'NIVA',
    featured: true,
    tag: 'Flagship Core',
    description: 'Закрытый кастомный движок, вдохновлённый kuni. По описанию сообщества — самое технически развитое и наиболее проработанное ядро в каталоге.',
    team: [
      { role: 'Техническая часть ядра', username: 'kavoakakiy' },
      { role: 'Вопросы по NIVA и продвижению', username: 'spasmic' }
    ]
  },
  {
    id: 'kuni_plus',
    name: 'Kuni+',
    featured: true,
    tag: 'Community Evolution',
    description: 'Наименование оригинального ядра с небольшими изменениями, внесёнными авторами.',
    team: []
  },
  {
    id: 'alivetales',
    name: 'AliveTales',
    featured: false,
    tag: 'Custom Core',
    description: 'Собственное ядро персонажа Нови (@Alvetor).',
    team: []
  },
  {
    id: 'kuni',
    name: 'kuni',
    featured: true,
    tag: 'Original Core',
    description: 'Оригинальное базовое ядро бота Куни (@kunii_chan), созданное автором @alex2772sc. Послужило фундаментом для всего сообщества и вдохновило создание NIVA, Kuni+ и других кастомных разработок.',
    team: [
      { role: 'Оригинальный бот', username: 'kunii_chan' },
      { role: 'Создатель ядра', username: 'alex2772sc' }
    ]
  },
  {
    id: 'custom',
    name: 'custom / Custom',
    featured: false,
    tag: 'Independent',
    description: 'Индивидуальные кастомные разработки авторов с уникальной логикой и промптингом.',
    team: []
  },
  {
    id: 'sekai',
    name: 'Sekai',
    featured: false,
    tag: 'Specialized',
    description: 'Специализированная архитектура Sekai Core для персонажей с расширенным социальным контекстом.',
    team: []
  },
  {
    id: 'nessacore',
    name: 'NessaCore (кастомный)',
    featured: false,
    tag: 'Custom Core',
    description: 'Собственное кастомное ядро персонажа Несса.',
    team: []
  },
  {
    id: 'spermacore',
    name: 'SpermaCore',
    featured: false,
    tag: 'Custom Core',
    description: 'Самостоятельная кастомная технология ядра.',
    team: []
  },
  {
    id: 'raine',
    name: 'Raine (java)',
    featured: false,
    tag: 'Java Architecture',
    description: 'Специализированный движок на платформе Java.',
    team: []
  }
];

// Compatibility for Browser & Node environments
if (typeof window !== 'undefined') {
  window.BOTS_DATA = BOTS_DATA;
  window.ENGINES_DATA = ENGINES_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BOTS_DATA, ENGINES_DATA };
}

