import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    console.log("🚀 Tentando ler o banco no Railway...")
    const viagens = await prisma.trip.findMany()
    
    if (viagens.length === 0) {
      console.log("⚠️ Conectado, mas o banco está VAZIO. Vá ao Prisma Studio e adicione dados.")
    } else {
      console.log("✅ Dados encontrados com sucesso:")
      console.table(viagens)
    }
  } catch (e) {
    console.error("❌ Erro crítico de conexão:", e)
  } finally {
    await prisma.$disconnect()
  }
}

main()