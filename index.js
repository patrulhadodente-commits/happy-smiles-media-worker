require('dotenv').config()

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function run() {
  console.log('🎬 Happy Smiles Media Worker iniciado')

  while (true) {
    try {
      const { data, error } = await supabase.rpc(
        'claim_media_processing_job',
        {
          p_worker_id: 'railway-media-worker'
        }
      )

      if (error) {
        console.error('❌ Erro RPC:', error)
      } else if (data) {
        console.log('📦 Job encontrado:', data)
      } else {
        console.log('😴 Nenhum job pendente')
      }

    } catch (err) {
      console.error('💥 Erro geral:', err)
    }

    await sleep(5000)
  }
}

run()
