# from /workspaces/fueleu-maritime/backend
cat > prisma/seed.js <<'EOF'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.route.deleteMany()
  await prisma.route.createMany({
    data: [
      { routeId:'R001', vesselType:'Container',   fuelType:'HFO', year:2024, ghgIntensity:91.0, fuelTons:5000, distanceKm:12000, totalEmissionsT:4500, isBaseline:true },
      { routeId:'R002', vesselType:'BulkCarrier', fuelType:'LNG', year:2024, ghgIntensity:88.0, fuelTons:4800, distanceKm:11500, totalEmissionsT:4200, isBaseline:false },
      { routeId:'R003', vesselType:'Tanker',      fuelType:'MGO', year:2024, ghgIntensity:93.5, fuelTons:5100, distanceKm:12500, totalEmissionsT:4700, isBaseline:false },
      { routeId:'R004', vesselType:'RoRo',        fuelType:'HFO', year:2025, ghgIntensity:89.2, fuelTons:4900, distanceKm:11800, totalEmissionsT:4300, isBaseline:false },
      { routeId:'R005', vesselType:'Container',   fuelType:'LNG', year:2025, ghgIntensity:90.5, fuelTons:4950, distanceKm:11900, totalEmissionsT:4400, isBaseline:false }
    ]
  })
  console.log('✅ Seed data inserted')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
EOF
