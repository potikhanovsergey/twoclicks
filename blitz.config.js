module.exports = {
  webpack: (config, options) => {
    config.image.deviceSizes = [576, 768, 992, 1200, 1400]
    return config
  },
}
