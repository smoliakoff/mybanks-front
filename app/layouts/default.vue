<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

// i18n (nuxt-i18n)
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()
const { t } = useI18n()

// color mode
const colorMode = useColorMode()
const toggleColor = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const headerLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Banks',
    to: localePath('home'),
    icon: 'i-lucide-building-2',
    active: route.path === localePath('/')
  }
  // на будущее можно добавить:
  // { label: 'About', to: localePath('/about'), icon: 'i-lucide-info' }
])

const localeItems = computed(() =>
    (locales.value as any[]).map((l) => ({
      label: l.name || l.code,
      to: switchLocalePath(l.code)
    }))
)

const footerLinks: ComputedRef<NavigationMenuItem[]> = computed(() =>
  [
    // { label: t('common.contactUs'), to: '/contact', target: '_blank' }
  ]
)
</script>


<template>
  <div class="min-h-dvh flex flex-col">

  <UHeader title="MyBanks" :links="headerLinks">
      <template #right>
        <!-- Locale -->
        <UDropdownMenu :items="localeItems">
          <UButton
              color="neutral"
              variant="ghost"
              icon="radix-icons:globe"
              :label="String(locale).toUpperCase()"
          />
        </UDropdownMenu>

        <!-- Theme -->
        <UColorModeSwitch />
      </template>
    </UHeader>
    <UMain class="flex-1 min-h-0">
      <slot />
    </UMain>
    <USeparator type="dashed" class="h-px" />
    <UFooter class="mt-auto">
      <template #left>
        <p class="text-muted text-sm">
          © {{ new Date().getFullYear() }} MyBanks
        </p>
      </template>

      <UNavigationMenu :items="footerLinks" variant="link" />

      <template #right>
        <UButton
            icon="i-simple-icons-github"
            color="neutral"
            variant="ghost"
            to="https://github.com/smoliakoff"
            target="_blank"
            aria-label="GitHub"
        />
      </template>
    </UFooter>
  </div>
</template>
