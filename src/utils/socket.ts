import { io } from 'socket.io-client'
import config from '@/config'

const Socket = io(config.SERVER_URL)

export default Socket;