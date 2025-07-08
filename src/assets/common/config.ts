const config = {
	/** Set during during initialization, see "../../../vite.config.ts" */
	mode: '',
	baseUrl: '/',
	isPlugin: false,
	isProduction: false,
	name: 'project-animalcrossing',
	init(mode: string) {
		this.mode = mode;
		this.isPlugin = mode === 'plugin';
		this.isProduction = mode === 'production';
		this.baseUrl = mode === 'plugin' ? '/projects/animalcrossing' : '/';
		return Promise.resolve(this.baseUrl);
	},
	sanitizeRoute(path: string) {
		if (!path.includes(this.baseUrl)) return false;
		const sanitized = this.isPlugin ? path.replace(this.baseUrl, '') : '';
		return sanitized;
	},
};

export default config;
