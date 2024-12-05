import _if from 'gulp-if';
import plumber from 'gulp-plumber';
import sprite from 'gulp-svg-sprite';
import { dest, src } from 'gulp';
import { config } from '../config.mjs';

export const handleIcons = () => {
	const spriteMode = {
		symbol: {
			dest: '.',
			sprite: 'sprite.svg',
		},
	};

	const spriteShape = {
		transform: [
			{
				svgo: {
					plugins: [
						'preset-default',
						{
							name: 'removeAttrs',
							params: {
								attrs: '(fill|stroke)',
							},
						},
						// {
						// 	name: 'addAttributesToSVGElement',
						// 	params: {
						// 		attributes: [{ fill: 'none', stroke: 'none' }],
						// 	},
						// },
						{
							name: 'inlineStyles',
							params: {
								onlyMatchedOnce: false,
							},
						},
						{
							name: 'removeDimensions',
						},
					],
				},
			},
		],
	};

	return src(config.path.src.icons, { encoding: false, ignore: ['**/_*'] })
		.pipe(plumber())
		.pipe(_if(config.mode.prod, dest(config.path.dest.icons)))
		.pipe(
			sprite({
				mode: spriteMode,
				shape: spriteShape,
			}),
		)
		.pipe(dest(config.path.dest.icons));
};
