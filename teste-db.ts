import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    console.log("🚀 Conectando ao banco no Railway...")
    const viagens = await prisma.trip.findMany() 
    console.log("✅ Dados encontrados:")
    console.table(viagens)
  } catch (e) {
    console.error("❌ Erro de conexão:", e)
  } finally {
    await prisma.$disconnect()
  }
}

main()