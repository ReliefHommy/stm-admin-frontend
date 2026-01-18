//app/studio-dashboard/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp,
  TrendingDown,
  Layers,
  LayoutTemplate,
  Megaphone,
  Images,
  ArrowUpRight,
} from 'lucide-react'

// -----------------------------
// Studio Mock Data (your schema)
// -----------------------------

// Pillars
const pillars = ['foods', 'wellness', 'games', 'thaiEU'] as const

// DesignTemplate types
const designTemplateTypes = [
  { key: 'pinterest_pin', label: 'Pinterest Pin' },
  { key: 'fb_post', label: 'Facebook Post' },
  { key: 'ig_post', label: 'Instagram Post' },
  { key: 'yt_thumb', label: 'YouTube Thumbnail' },
  { key: 'blog_hero', label: 'Blog Hero' },
] as const

// AutoPost platforms (also used by Asset)
const platforms = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'stm', label: 'stm' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'tiktok', label: 'TikTok' },
] as const

// Quick stats on top
const stats = [
  {
    title: 'Pillars',
    value: pillars.length, // 4
    change: 0,
    changeType: 'increase' as const,
    icon: Layers,
  },
  {
    title: 'Design Templates',
    value: designTemplateTypes.length, // 5
    change: 0,
    changeType: 'increase' as const,
    icon: LayoutTemplate,
  },
  {
    title: 'Campaigns',
    value: 3, // mock count
    change: 8,
    changeType: 'increase' as const,
    icon: Megaphone,
  },
  {
    title: 'Assets',
    value: 18, // mock count
    change: 12,
    changeType: 'increase' as const,
    icon: Images,
  },
]

// “Latest Orders” table → “Latest Campaign Posts”
const recentCampaignPosts = [
  { id: 'CP-001', name: 'Som Tum Ingredients Pin', platform: 'stm', status: 'Published', pillar: 'foods' },
  { id: 'CP-002', name: 'ThaiEU Intro Post', platform: 'facebook', status: 'Scheduled', pillar: 'thaiEU' },
  { id: 'CP-003', name: 'Wellness Tip Carousel', platform: 'instagram', status: 'Draft', pillar: 'wellness' },
  { id: 'CP-004', name: 'Games Weekend Teaser', platform: 'tiktok', status: 'Failed', pillar: 'games' },
]

// “Latest Products/Posts” list → recent studio items
const recentStudioItems = [
  { id: '1', title: 'Pinterest Pin Template', type: 'DesignTemplate', meta: 'pinterest_pin', image: '/placeholder.jpg' },
  { id: '2', title: 'Campaign: Thai Groceries Week', type: 'Campaign', meta: 'foods', image: '/placeholder.jpg' },
  { id: '3', title: 'AutoPost: IG Scheduler', type: 'AutoPost', meta: 'instagram', image: '/placeholder.jpg' },
  { id: '4', title: 'Theme: Soft Orange + Teal', type: 'Theme', meta: 'brand', image: '/placeholder.jpg' },
  { id: '5', title: 'Topic: Thai–Scandinavian Fusion', type: 'Topic', meta: 'content', image: '/placeholder.jpg' },
  { id: '6', title: 'Asset Pack: Food Icons', type: 'Asset', meta: 'stm', image: '/placeholder.jpg' },
]

function statusBadgeClass(status: string) {
  // studio statuses
  switch (status) {
    case 'Published':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'Scheduled':
      return 'bg-sky-50 text-sky-700 border-sky-200'
    case 'Draft':
      return 'bg-amber-50 text-amber-800 border-amber-200'
    case 'Failed':
      return 'bg-rose-50 text-rose-700 border-rose-200'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

function pillarBadgeClass(pillar: string) {
  // subtle pillar tinting
  switch (pillar) {
    case 'foods':
      return 'bg-orange-50 text-orange-800 border-orange-200'
    case 'wellness':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200'
    case 'games':
      return 'bg-violet-50 text-violet-800 border-violet-200'
    case 'thaiEU':
      return 'bg-sky-50 text-sky-800 border-sky-200'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

export default function StudioDashboard() {
  return (
    <div className="relative">
      {/* Soft studio background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/60 via-white to-white" />
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-500">Studio • Overview</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Dashboard
              <span className="ml-2 align-middle text-sm font-semibold text-teal-700/90">
                (STM AI Studio)
              </span>
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Templates, campaigns, autoposts, assets, themes, and topics in one place.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-full border border-teal-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white">
              Today
            </button>
            <button className="rounded-full border border-teal-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur hover:bg-white">
              This week
            </button>
            <button className="rounded-full border border-teal-200 bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700">
              This month
            </button>
          </div>
        </div>

        {/* Quick Stat Tiles */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            const isUp = stat.changeType === 'increase'
            return (
              <Card
                key={stat.title}
                className="group relative overflow-hidden border-teal-100/70 bg-white/70 shadow-sm backdrop-blur transition hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-teal-400 to-amber-200 opacity-70" />

                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-sm font-semibold text-slate-700">
                    {stat.title}
                  </CardTitle>

                  <div className="flex items-center gap-2">
                    <div className="grid h-9 w-9 place-items-center rounded-xl border border-teal-100 bg-teal-50 text-teal-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    {isUp ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-rose-600" />
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>

                    <div
                      className={[
                        'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold',
                        isUp
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-rose-200 bg-rose-50 text-rose-700',
                      ].join(' ')}
                    >
                      <span>
                        {stat.change > 0 ? '+' : ''}
                        {stat.change}%
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-500">Compared to last month</p>

                  <div className="h-2 w-full rounded-full bg-teal-100/60">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-teal-600 to-teal-400"
                      style={{
                        width: `${Math.min(100, Math.max(8, Math.abs(stat.change) * 6))}%`,
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity Feed */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Latest Campaign Posts */}
          <Card className="border-teal-100/70 bg-white/70 shadow-sm backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                Latest Campaign Posts
              </CardTitle>
              <span className="text-xs font-medium text-slate-500">Updated just now</span>
            </CardHeader>

            <CardContent>
              <div className="overflow-hidden rounded-xl border border-teal-100 bg-white">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-teal-50/70 hover:bg-teal-50/70">
                      <TableHead className="text-slate-700">Post ID</TableHead>
                      <TableHead className="text-slate-700">Name</TableHead>
                      <TableHead className="text-slate-700">Pillar</TableHead>
                      <TableHead className="text-slate-700">Status</TableHead>
                      <TableHead className="text-right text-slate-700">Platform</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {recentCampaignPosts.map((p) => (
                      <TableRow key={p.id} className="hover:bg-teal-50/40">
                        <TableCell className="font-semibold text-slate-900">
                          {p.id}
                        </TableCell>

                        <TableCell className="text-slate-700">{p.name}</TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={[
                              'rounded-full px-2.5 py-1 text-xs font-semibold',
                              pillarBadgeClass(p.pillar),
                            ].join(' ')}
                          >
                            {p.pillar}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant="outline"
                            className={[
                              'rounded-full px-2.5 py-1 text-xs font-semibold',
                              statusBadgeClass(p.status),
                            ].join(' ')}
                          >
                            {p.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right font-semibold text-slate-900">
                          {p.platform}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                Next: wire click row → open CampaignPost details page.
              </div>
            </CardContent>
          </Card>

          {/* Latest Studio Items */}
          <Card className="border-teal-100/70 bg-white/70 shadow-sm backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-bold text-slate-900">
                Latest Studio Items
              </CardTitle>
              <span className="text-xs font-medium text-slate-500">Last 7 days</span>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {recentStudioItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-teal-100 bg-white p-3 shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-teal-100 bg-gradient-to-br from-teal-100 to-orange-50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover opacity-90"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">{item.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-full border-teal-200 bg-teal-50 text-teal-800"
                        >
                          {item.type}
                        </Badge>
                        <span className="text-xs text-slate-500">• {item.meta}</span>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-teal-700 hover:text-teal-800">
                      View
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-orange-200/80 bg-gradient-to-r from-orange-50 to-amber-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  Studio data model ready ✅
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Pillars: {pillars.join(', ')} • Templates: {designTemplateTypes.length} • Platforms: {platforms.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
