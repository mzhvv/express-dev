import type { EnvMode } from './types'

// prettier-ignore
export const PORT: number = process.env.PORT 
	? parseInt(process.env.PORT, 10) 
	: 3001

// prettier-ignore
export const MODE: string = (process.env.NODE_ENV as EnvMode) === 'development' 
	? 'Development mode' 
	: 'Production mode'
