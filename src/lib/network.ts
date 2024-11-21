async function testNetworkSpeed() {
  const startTime = new Date().getTime()
  const fileSizeInBytes = 1024 * 1024 // 1MB

  // try {
  //   const response = await fetch(
  //     'https://web.stepwisemath.ai/asset-v1:Querium_University+WARN102+AISD_Fall2024+type@asset+block@images_course_image.jpg',
  //     { cache: 'no-cache' },
  //   )
  //   const _blob = await response.blob()

  //   const endTime = new Date().getTime()
  //   const durationInSeconds = (endTime - startTime) / 1000
  //   const speedInMbps =
  //     (fileSizeInBytes * 8) / (durationInSeconds * 1024 * 1024)

  //   return { type: 'measured (Mbps)', speed: speedInMbps }
  // } catch (error) {
  //   console.error(
  //     'NETWORK SPEED - Error measuring due to CORS constipation:',
  //     error,
  //   )
  if (navigator.connection) {
    const { effectiveType, downlink } = navigator.connection
    console.info(
      'NETWORK SPEED - Falling back to browser guestimate:',
      effectiveType,
      downlink,
    )
    return { type: effectiveType + ' (Mbps)', speed: downlink || 0 }
  } else {
    return { type: 'NetworkSpeedUnavailable:', speed: -1 }
  }
  // }
}

export default testNetworkSpeed
