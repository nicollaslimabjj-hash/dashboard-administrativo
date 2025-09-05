"use client"

import { useState } from "react"
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Home,
  Settings,
  FileText,
  PieChart,
  Bell,
  User
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dados mockados para demonstração
const statsData = [
  {
    title: "Receita Total",
    value: "R$ 45.231",
    change: "+20.1%",
    icon: DollarSign,
    trend: "up"
  },
  {
    title: "Usuários Ativos",
    value: "2.350",
    change: "+180.1%",
    icon: Users,
    trend: "up"
  },
  {
    title: "Vendas",
    value: "12.234",
    change: "+19%",
    icon: ShoppingCart,
    trend: "up"
  },
  {
    title: "Taxa de Conversão",
    value: "3.2%",
    change: "+2.5%",
    icon: TrendingUp,
    trend: "up"
  }
]

const tableData = [
  { id: 1, name: "João Silva", email: "joao@email.com", status: "Ativo", role: "Admin", date: "2024-01-15" },
  { id: 2, name: "Maria Santos", email: "maria@email.com", status: "Ativo", role: "Editor", date: "2024-01-14" },
  { id: 3, name: "Pedro Costa", email: "pedro@email.com", status: "Inativo", role: "Viewer", date: "2024-01-13" },
  { id: 4, name: "Ana Oliveira", email: "ana@email.com", status: "Ativo", role: "Editor", date: "2024-01-12" },
  { id: 5, name: "Carlos Lima", email: "carlos@email.com", status: "Pendente", role: "Viewer", date: "2024-01-11" },
  { id: 6, name: "Lucia Ferreira", email: "lucia@email.com", status: "Ativo", role: "Admin", date: "2024-01-10" },
  { id: 7, name: "Roberto Alves", email: "roberto@email.com", status: "Inativo", role: "Editor", date: "2024-01-09" },
  { id: 8, name: "Fernanda Rocha", email: "fernanda@email.com", status: "Ativo", role: "Viewer", date: "2024-01-08" }
]

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: Users, label: "Usuários" },
  { icon: ShoppingCart, label: "Vendas" },
  { icon: FileText, label: "Relatórios" },
  { icon: PieChart, label: "Analytics" },
  { icon: Settings, label: "Configurações" }
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const itemsPerPage = 5

  // Filtrar dados da tabela
  const filteredData = tableData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  // Paginação
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    const variants = {
      "Ativo": "default",
      "Inativo": "secondary", 
      "Pendente": "outline"
    } as const
    
    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">AdminPanel</h1>
                <p className="text-xs text-gray-500">Dashboard v2.0</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}>
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">Bem-vindo de volta! Aqui está o resumo dos seus dados.</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change} em relação ao mês anterior
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Placeholder */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Visão Geral de Vendas</CardTitle>
                <CardDescription>
                  Receita dos últimos 12 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Gráfico de Vendas</p>
                    <p className="text-sm text-gray-400">Dados serão exibidos aqui</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Últimas ações no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: "João Silva", action: "fez login", time: "2 min atrás" },
                    { user: "Maria Santos", action: "criou relatório", time: "5 min atrás" },
                    { user: "Pedro Costa", action: "atualizou perfil", time: "10 min atrás" },
                    { user: "Ana Oliveira", action: "fez logout", time: "15 min atrás" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table Section */}
          <Card className="mt-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Gerenciamento de Usuários</CardTitle>
                  <CardDescription>
                    Lista completa de usuários do sistema
                  </CardDescription>
                </div>
                
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-gray-500">{user.email}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-gray-500">{user.date}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Editar</DropdownMenuItem>
                              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredData.length)} de {filteredData.length} resultados
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}