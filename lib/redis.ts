import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL!;
// Ganti redis:// menjadi rediss:// untuk TLS, lalu tambahkan opsi tls
const tlsUrl = redisUrl.replace('redis://', 'rediss://');

const redis = new Redis(tlsUrl, {
  tls: {
    rejectUnauthorized: false, // Wajib untuk Redis cloud
  },
  maxRetriesPerRequest: null, // penting: jangan retry per request
});

export default redis;