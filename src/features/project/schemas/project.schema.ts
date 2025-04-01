import { z } from 'zod';

import { REQUIRED_FIELD } from '@/shared/config';

export const ProjectSchema = z.object({
	name: z.string().min(1, REQUIRED_FIELD),
	description: z.string().min(1, REQUIRED_FIELD),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;
