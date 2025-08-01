const config = {
	/** Set during during initialization, see "../../../vite.config.ts" */
	mode: '',
	baseUrl: '/',
	isPlugin: false,
	isProduction: false,
	name: 'project-ac',
	weatherKey: 'c818f18fb44cfccea6436940f6cea5f8',
	init(mode: string) {
		this.mode = mode;
		this.isPlugin = mode === 'plugin';
		this.isProduction = mode === 'production';
		this.baseUrl = mode === 'plugin' ? '/projects/ac' : '/';
		return Promise.resolve(this.baseUrl);
	},
	sanitizeRoute(path: string) {
		if (!path.includes(this.baseUrl)) return false;
		const sanitized = this.isPlugin ? path.replace(this.baseUrl, '') : '';
		return sanitized;
	},
};

export default config;
