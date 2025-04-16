import { z } from 'zod';

import { REQUIRED_FIELD } from '@/shared/config';

export const TagSchema = z.object({
	name: z.string().min(1, REQUIRED_FIELD),
	description: z.string().min(1, REQUIRED_FIELD),
	departmentId: z.string().optional(),
});

export type TagSchemaType = z.infer<typeof TagSchema>;
