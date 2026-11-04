package com.henry.kite.ui.theme

import androidx.compose.ui.graphics.Color

// Livezala Brand Design System Colors (from livezala.com & src/styles.css)
// Main background: #0A0A0A
// Card surfaces: #101010 / #161616 / #1A1A1A
// Borders: #262626 / #2E2E2E
// Typography: Main #F5F5F5, Secondary #A3A3A3, Muted #737373
// Brand Gold: #E9A13B, Hover: #D28A26, Badge Bg: #221A08, Badge Border: #4A3512
// Logo Orange: #FF8A3D (accent dot)
// Status: Success #4ADE80, Danger/Error #F87171

val brandGold = Color(0xFFE9A13B)
val brandGoldHover = Color(0xFFD28A26)
val brandGoldMuted = Color(0x26E9A13B)
val brandOrange = Color(0xFFFF8A3D)
val brandDarkBg = Color(0xFF0A0A0A)
val brandCard = Color(0xFF161616)
val brandCardSubtle = Color(0xFF101010)
val brandCardElevated = Color(0xFF1A1A1A)
val brandBorder = Color(0xFF262626)
val brandBorderLight = Color(0xFF2E2E2E)
val brandText = Color(0xFFF5F5F5)
val brandTextSecondary = Color(0xFFA3A3A3)
val brandTextMuted = Color(0xFF737373)
val brandSuccess = Color(0xFF4ADE80)
val brandDanger = Color(0xFFF87171)

// Dark Palette (Primary palette used everywhere)
val primaryDark = brandGold
val onPrimaryDark = Color(0xFF0A0A0A)
val primaryContainerDark = Color(0xFF221A08)
val onPrimaryContainerDark = brandGold

val secondaryDark = Color(0xFFD4AF37)
val onSecondaryDark = Color(0xFF0A0A0A)
val secondaryContainerDark = Color(0xFF1A1A1A)
val onSecondaryContainerDark = Color(0xFFF5F5F5)

val tertiaryDark = brandOrange
val onTertiaryDark = Color(0xFFFFFFFF)
val tertiaryContainerDark = Color(0xFF2D1807)
val onTertiaryContainerDark = brandOrange

val errorDark = brandDanger
val onErrorDark = Color(0xFF0A0A0A)
val errorContainerDark = Color(0xFF331111)
val onErrorContainerDark = brandDanger

val backgroundDark = brandDarkBg
val onBackgroundDark = brandText
val surfaceDark = brandCard
val onSurfaceDark = brandText
val surfaceVariantDark = brandCardElevated
val onSurfaceVariantDark = brandTextSecondary
val outlineDark = brandBorder
val outlineVariantDark = brandBorderLight
val surfaceContainerLowestDark = brandDarkBg
val surfaceContainerLowDark = brandCardSubtle
val surfaceContainerDark = brandCard
val surfaceContainerHighDark = brandCardElevated
val surfaceContainerHighestDark = Color(0xFF222222)

// Light Palette (kept consistent with warm dark-neutral aesthetic)
val primaryLight = brandGold
val onPrimaryLight = Color(0xFF0A0A0A)
val primaryContainerLight = Color(0xFFFFF3D6)
val onPrimaryContainerLight = Color(0xFF3B2600)
val secondaryLight = Color(0xFF715B2F)
val onSecondaryLight = Color(0xFFFFFFFF)
val secondaryContainerLight = Color(0xFFFCE1B8)
val onSecondaryContainerLight = Color(0xFF261A00)
val tertiaryLight = brandOrange
val onTertiaryLight = Color(0xFFFFFFFF)
val tertiaryContainerLight = Color(0xFFFFDBCF)
val onTertiaryContainerLight = Color(0xFF380D00)
val errorLight = Color(0xFFBA1A1A)
val onErrorLight = Color(0xFFFFFFFF)
val errorContainerLight = Color(0xFFFFDAD6)
val onErrorContainerLight = Color(0xFF410002)
val backgroundLight = Color(0xFF0A0A0A) // Always dark background
val onBackgroundLight = Color(0xFFF5F5F5)
val surfaceLight = Color(0xFF161616)
val onSurfaceLight = Color(0xFFF5F5F5)
val surfaceVariantLight = Color(0xFF1A1A1A)
val onSurfaceVariantLight = Color(0xFFA3A3A3)
val outlineLight = Color(0xFF262626)
val outlineVariantLight = Color(0xFF2E2E2E)
val surfaceContainerLowestLight = Color(0xFF0A0A0A)
val surfaceContainerLowLight = Color(0xFF101010)
val surfaceContainerLight = Color(0xFF161616)
val surfaceContainerHighLight = Color(0xFF1A1A1A)
val surfaceContainerHighestLight = Color(0xFF222222)
