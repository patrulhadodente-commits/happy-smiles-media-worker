while (true) {
  try {
    const { data, error } = await supabase.rpc(
      'claim_media_processing_job',
      {
        p_worker_id: 'railway-media-worker',
        p_kinds: ['video_transcode']
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
