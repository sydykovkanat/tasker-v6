import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { AuthSchema, AuthSchemaType } from '@/features/auth/schemas';
import { useAuthStore } from '@/features/auth/store';

import { IconLogin } from '@/shared/components/shared';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
} from '@/shared/components/ui';

export function AuthForm() {
	const { login, isLoading, loginError } = useAuthStore();

	const form = useForm<AuthSchemaType>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = (body: AuthSchemaType) => {
		login(body);
	};

	useEffect(() => {
		if (loginError) {
			toast.error(loginError.message);
		}
	}, [loginError]);

	return (
		<main
			className={
				'flex min-h-screen flex-col items-center justify-center space-y-6'
			}
		>
			<Form {...form}>
				<header className={'max-w-sm space-y-2 text-center'}>
					<h1 className={'text-2xl font-semibold'}>Войти в аккаунт</h1>
					<p className={'text-muted-foreground text-sm'}>
						Для доступа к личному кабинету введите свою рабочую почту и пароль
						(@shoro.kg)
					</p>
				</header>

				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={'w-full max-w-md space-y-4'}
				>
					<FormField
						control={form.control}
						name={'email'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={'Рабочая почта @shoro.kg'}
										autoComplete={'off'}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={'password'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type={'password'}
										placeholder={'Пароль'}
										autoComplete={'off'}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						loading={isLoading}
						size={'lg'}
						className={'mx-auto flex w-[86%]'}
					>
						<IconLogin />
						Продолжить
					</Button>
				</form>
			</Form>
		</main>
	);
}
