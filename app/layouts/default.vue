<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

// i18n (nuxt-i18n)
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale, locales } = useI18n()

// color mode
const colorMode = useColorMode()
const toggleColor = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const headerLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Banks',
    to: localePath('/'),
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

const footerLinks: NavigationMenuItem[] = [
  { label: 'Contact us', to: '/contact', target: '_blank' }
]
</script>


<template>
    <UHeader title="MyBanks" :links="headerLinks">
      <template #right>
        <!-- Locale -->
        <UDropdownMenu :items="localeItems">
          <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-languages"
              :label="String(locale).toUpperCase()"
          />
        </UDropdownMenu>

        <!-- Theme -->
        <UColorModeSwitch />
      </template>
    </UHeader>
    <UMain>
      <slot />
    </UMain>
    <USeparator type="dashed" class="h-px" />
    <UFooter>
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
</template>
