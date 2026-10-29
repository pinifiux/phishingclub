<script>
	import { goto } from '$app/navigation';
	import Input from '../../lib/components/Input.svelte';
	import CTAbutton from '../../lib/components/CTAbutton.svelte';
	import { AppStateService } from '$lib/service/appState';
	import { onMount } from 'svelte';
	import { UserService } from '$lib/service/user';
	import FormGrid from '$lib/components/FormGrid.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FormButton from '$lib/components/FormButton.svelte';
	import FormError from '$lib/components/FormError.svelte';
	import HeadTitle from '$lib/components/HeadTitle.svelte';
	import FormColumns from '$lib/components/FormColumns.svelte';
	import FormColumn from '$lib/components/FormColumn.svelte';
	import { hideIsLoading, showIsLoading } from '$lib/store/loading';
	import { api } from '$lib/api/apiProxy';
	import { addToast } from '$lib/store/toast';
	import { page } from '$app/stores';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Logo from '$lib/components/header/Logo.svelte';
	import { setupTheme, setupOSThemeListener, theme } from '$lib/theme.js';

	// services
	const appState = AppStateService.instance;
	const userService = UserService.instance;

	// mismas clases que el login de la SOC (Login.tsx: inputCls / label)
	const inputCls =
		'w-full rounded-md border border-hairline bg-surface-inset py-2.5 pl-9 pr-3 text-sm text-content outline-none transition focus:border-brand/60 focus:ring-2 focus:ring-brand/25';
	const labelCls = 'mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-content-subtle';

	// local state
	let formValues = {
		username: '',
		password: '',
		mfaTOTP: ''
	};
	let mfaRecoveryFormValues = {
		recoveryCode: ''
	};
	let isMFARecoveryModalVisible = false;
	let isMFAModalVisible = false;
	let loginError = '';
	let mfaError = '';
	let mfaRecoveryLoginError = '';
	let inputType = 'password';
	let isPasswordVisible = true;
	let isSSOEnabled = false;
	let ssoProviderType = 'entra';
	let exclusiveLogin = false;

	let isSubmitting = false;

	// hooks
	onMount(() => {
		// initialize theme system
		setupTheme();
		setupOSThemeListener();

		// if the user is already logged in, we want to redirect to the dashboard
		if (appState.isLoggedIn()) {
			console.info('login: navigating to /dashboard');
			goto('/dashboard/');
			return;
		}
		refreshIsSSOEnabled();
		if ($page.url.searchParams.get('ssoAuthError')) {
			addToast(ssoErrorMessage($page.url.searchParams.get('reason')), 'Error');
		}
	});

	// maps the reason code from the SSO callback to a message shown to the user
	const ssoErrorMessage = (reason) => {
		switch (reason) {
			case 'not_provisioned':
				return 'SSO login failed: this account does not exist in Phishing Club. An administrator must create it first.';
			case 'email_not_verified':
				return 'SSO login failed: your email is not verified by the identity provider.';
			case 'no_email':
				return 'SSO login failed: the identity provider did not return an email address.';
			case 'mfa_required':
				return 'SSO login failed: multi factor authentication is required by the configured authentication context.';
			default:
				return 'SSO login failed';
		}
	};

	const refreshIsSSOEnabled = async () => {
		showIsLoading();
		try {
			const res = await api.sso.isEnabled();
			if (res.data && res.data.enabled) {
				isSSOEnabled = true;
				ssoProviderType = res.data.providerType || 'entra';
				exclusiveLogin = !!res.data.exclusiveLogin;
			}
		} catch (e) {
			addToast('failed to check sso status', 'Error');
			console.error('failed to check sso status', e);
		} finally {
			hideIsLoading();
		}
	};

	/**
	 * Submit the MFA recovery code
	 * @param {'password'|'totp'|'recovery'} method
	 * @param {Event} event  the submit event
	 */
	const onSubmitLogin = async (method, event) => {
		if (event) {
			event.preventDefault();
		}
		isSubmitting = true;
		showIsLoading();
		try {
			let res;
			switch (method) {
				case 'password': {
					res = await userService.login(formValues.username, formValues.password);
					break;
				}
				case 'totp': {
					res = await userService.login(
						formValues.username,
						formValues.password,
						formValues.mfaTOTP
					);
					break;
				}
				case 'recovery': {
					res = await userService.login(
						formValues.username,
						formValues.password,
						'',
						mfaRecoveryFormValues.recoveryCode
					);
					break;
				}
			}
			switch (res.statusCode) {
				case 200: {
					loginError = '';
					if (res.data.mfa) {
						isMFAModalVisible = true;
						return;
					}
					if (method === 'recovery') {
						alert('WARNING: MFA IS NOW DISABLED');
						return;
					}
					break;
				}
				case 400: {
					// if a mfa token was supplied then the error is for MFA
					if (formValues.mfaTOTP) {
						mfaError = 'Invalid MFA code';
						break;
					}
					if (method === 'recovery') {
						mfaRecoveryLoginError = 'Invalid recovery code';
						break;
					}
					loginError = 'Invalid credentials';
				}
				case 401: {
					loginError = 'Invalid credentials';
					break;
				}
				case 429: {
					if (method === 'recovery') {
						mfaRecoveryLoginError = 'Too many attempts - try again in a few seconds';
						break;
					}
					if (formValues.mfaTOTP) {
						mfaError = 'Too many attempts - try again in a few seconds';
						break;
					}
					loginError = 'Too many attempts - try again in a few seconds';
					// if a mfa token was supplied then the error is for MFA
					break;
				}
				default: {
					if (method === 'recovery') {
						mfaRecoveryLoginError = 'Unknown error';
						break;
					}
					if (formValues.mfaTOTP) {
						mfaError = 'Unknown error';
						break;
					}
					loginError = 'Unknown error';
					break;
				}
			}
		} catch (e) {
			console.error(e);
		} finally {
			isSubmitting = false;
			hideIsLoading();
		}
		return false;
	};
	const showMFARecoveryModal = () => {
		isMFARecoveryModalVisible = true;
	};

	const handleClick = (e) => {
		e.preventDefault();
		// bug - this fixes a bug where if a user
		// clicks enter inside the button field, the password is shown
		if (e.target.tagName === 'BUTTON') {
			return;
		}
		isPasswordVisible = !isPasswordVisible;
		if (isPasswordVisible) {
			inputType = 'password';
		} else {
			inputType = 'text';
		}
	};

	const closeMFAModal = () => {
		isMFAModalVisible = false;
		formValues.mfaTOTP = '';
		mfaError = '';
	};

	const closeMFARecoveryModal = () => {
		isMFARecoveryModalVisible = false;
		mfaRecoveryFormValues.recoveryCode = '';
		mfaRecoveryLoginError = '';
	};

	const openMFARecoveryModal = () => {
		closeMFAModal();
		isMFARecoveryModalVisible = true;
	};
</script>

<HeadTitle title="Sign in" />
<!-- Mismo diseño que el login de Cassiterion-SOC (frontend/src/Login.tsx), con el acento Dasenda. -->
<main
	class="relative flex min-h-screen items-center justify-center overflow-hidden px-4 text-content"
	style="background: radial-gradient(900px 480px at 50% -8%, color-mix(in srgb, rgb(var(--pc-accent)) 12%, rgb(var(--pc-surface-base))) 0%, rgb(var(--pc-surface-base)) 55%)"
>
	<img
		src="/brand/cassiterion-pattern.svg"
		alt=""
		aria-hidden="true"
		class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07]"
	/>

	<!-- theme toggle -->
	<div class="fixed top-3 right-6 z-50">
		<ThemeToggle />
	</div>

	<div class="relative w-full max-w-sm">
		<div class="mb-7 flex flex-col items-center">
			<Logo size={20} tagline={false} />
		</div>

		<form
			id="login-form"
			on:submit={(e) => onSubmitLogin('password', e)}
			class="relative rounded-2xl border border-hairline bg-surface-raised p-7 shadow-2xl shadow-black/30"
		>
			<div
				class="absolute inset-x-6 top-0 h-px rounded-full opacity-60"
				style="background: linear-gradient(90deg, transparent, rgb(var(--pc-accent)), transparent)"
			></div>

			<div class="mb-5 flex items-center gap-2 text-content-muted">
				<svg class="h-[15px] w-[15px] shrink-0 text-brand" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
				<p class="text-xs">Phishing simulation — operator access</p>
			</div>

			{#if loginError}
				<div
					class="mb-4 flex items-start gap-2 rounded-md border border-danger/30 bg-danger/10 px-3 py-2.5 text-xs text-danger"
				>
					{loginError}
				</div>
			{/if}

			{#if !exclusiveLogin}
				<label for="Username" class={labelCls}>Username</label>
				<div class="relative mb-4">
					<svg class="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-content-subtle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
					<input
						required
						on:keyup={(event) => {
							const t = /** @type {HTMLInputElement} */ (event.target);
							formValues.username = t.value;
						}}
						on:keydown={(event) => {
							if (event.key === 'Enter') {
								onSubmitLogin('password', null);
							}
						}}
						value={formValues.username}
						autocomplete="off"
						tabindex="0"
						type="text"
						id="Username"
						name="Username"
						class={inputCls}
					/>
				</div>

				<label for="Password" class={labelCls}>Password</label>
				<div class="relative mb-1">
					<svg class="pointer-events-none absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-content-subtle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
					<input
						required
						on:keyup={(event) => {
							const t = /** @type {HTMLInputElement} */ (event.target);
							formValues.password = t.value;
						}}
						on:keydown={(event) => {
							if (event.key === 'Enter') {
								onSubmitLogin('password', null);
							}
						}}
						value={formValues.password}
						autocomplete="off"
						tabindex="0"
						type={inputType}
						id="Password"
						name="Password"
						class="{inputCls} pr-10"
					/>
					<button
						type="button"
						class="absolute right-2 top-1/2 z-10 h-7 w-7 -translate-y-1/2 opacity-60 hover:opacity-100"
						tabindex="-1"
						on:click={handleClick}
					>
						{#if isPasswordVisible}
							<img src="/view.svg" alt="view" class="grayscale dark:invert" />
						{:else}
							<img src="/toggle-view.svg" alt="toggle view" class="grayscale dark:invert" />
						{/if}
					</button>
				</div>

				<CTAbutton disabled={isSubmitting} />
			{/if}

			{#if isSSOEnabled}
				<div class="space-y-2 {exclusiveLogin ? '' : 'mt-5 border-t border-hairline pt-5'}">
					<a
						href={ssoProviderType === 'oidc'
							? '/api/v1/sso/oidc/login'
							: '/api/v1/sso/entra-id/login'}
						class="flex w-full items-center justify-center gap-2 rounded-md border border-hairline bg-surface-inset px-3 py-2.5 text-sm font-medium text-content transition hover:border-content-subtle/40 hover:bg-surface-overlay"
					>
						Sign in with SSO
					</a>
				</div>
			{/if}
		</form>

		<p class="mt-5 text-center text-[11px] tracking-wide text-content-subtle">
			AI-SOC&nbsp;&nbsp;·&nbsp;&nbsp;AGENTIC DEFENSE&nbsp;&nbsp;·&nbsp;&nbsp;ALWAYS AHEAD
		</p>

		<Modal headerText={'Multifactor check'} visible={isMFAModalVisible} onClose={closeMFAModal}>
			<FormGrid
				on:submit={(e) => {
					onSubmitLogin('totp', e);
				}}
			>
				<FormColumns>
					<FormColumn>
						<p
							class="text-center text-lg text-content transition-colors duration-200"
						>
							Enter the MFA code from your authenticator app
						</p>
						<Input fieldName={'MFA Code'} type="text" bind:value={formValues.mfaTOTP} />

						<div class="flex flex-col">
							<p
								class="text-sm text-content-muted transition-colors duration-200"
							>
								Forgot your MFA code? Recover your code <button
									type="button"
									on:click={showMFARecoveryModal}
									class="text-brand underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
									>here</button
								>
							</p>
						</div>
					</FormColumn>
				</FormColumns>
				<FormError message={mfaError} />
				<div
					class="row-start-7 py-4 row-span-2 col-start-1 col-span-3 border-t-2 dark:border-gray-600 w-full flex flex-row justify-center items-center sm:justify-center md:justify-center lg:justify-end xl:justify-end 2xl:justify-end transition-colors duration-200"
				>
					<FormButton>Verify</FormButton>
				</div>
			</FormGrid>
		</Modal>
		<Modal
			headerText={'MFA Recovery'}
			visible={isMFARecoveryModalVisible}
			onClose={closeMFARecoveryModal}
		>
			<FormGrid
				on:submit={(e) => {
					onSubmitLogin('recovery', e);
				}}
			>
				<FormColumns>
					<FormColumn>
						<div class="px-16 py-8">
							<p
								class="text-center text-lg text-content transition-colors duration-200"
							>
								Please enter the MFA recovery code
							</p>
							<Input
								fieldName={'MFA Recovery Code'}
								type="text"
								bind:value={mfaRecoveryFormValues.recoveryCode}
							/>
						</div>
					</FormColumn>
				</FormColumns>

				<FormError message={mfaRecoveryLoginError} />
				<div
					class="row-start-7 py-4 row-span-2 col-start-1 col-span-3 border-t-2 dark:border-gray-600 w-full flex flex-row justify-center items-center sm:justify-center md:justify-center lg:justify-end xl:justify-end 2xl:justify-end transition-colors duration-200"
				>
					<FormButton>Verify</FormButton>
				</div>
			</FormGrid>
		</Modal>
	</div>
</main>
