# The AI Project Manager: Creative Brief

# Sep 26, 2026 · @Ranjit

# An interactive 3D site where a glowing "project" sphere evolves through six chapters as the visitor scrolls, showing how AI agents and a human project manager work together.

# Concept

# A dark, futuristic scene with a glowing 3D sphere labelled PROJECT at the centre. Around it orbit Strategy, People, Data, Risk, Execution and AI Agents. Scrolling moves the sphere through a project's life, and the scene changes at each stage.

# Closing line: AI doesn't replace the project manager. It changes what the project manager can accomplish.

# Audience and goal

# The main audience is your LinkedIn network and hiring managers in healthcare IT, AI and project management. The site has to make them think: "He built this without being a developer?"

# It should prove three things:

# 1\. You can turn an idea into a working digital experience using AI.

# 2\. You understand modern AI-assisted product building.

# 3\. You can direct AI as a multidisciplinary team (designer, developer, QA, PM) and still keep the human in charge.

# The 3D must serve the story. It should never be decoration.

# Story arc

# Six chapters, one per scroll section. Each chapter changes the sphere and brings in a different agent.

# \#

# Chapter

# Question it answers

# What happens on screen

# 1

# Define

# What's the problem?

# Bare sphere appears; the project brief types in

# 2

# Plan

# What needs to happen?

# Sphere splits into a connected task network

# 3

# Delegate

# Who does what?

# Strategy, Data, Risk, Stakeholder and Delivery agents light up

# 4

# Monitor

# What could go wrong?

# Risk warnings pulse; some nodes turn amber

# 5

# Decide

# Who makes the call?

# Human and AI signals converge; the visitor clicks to choose

# 6

# Deliver

# Did it work?

# Sphere resolves into a completed, stable form

# Visual direction

# • Mood: dark, futuristic and calm, with one accent glow colour. Pick a single palette and keep it.

# • 3D: a procedural glowing sphere and particle network. No heavy imported models, so it stays fast on phones.

# • Motion: scroll drives the camera and the sphere (cinematic); hover and click effects on agents (UI).

# • Type: one large expressive display font for chapter titles, one clean sans for body text.

# • Mobile: the same story with a lighter scene and fewer particles.

# Claude will turn this into a full design system (colours, type, spacing, animation rules) before any code is written.

# Stack and version 1 scope

# The stack is free and Claude Code writes the code. Version 1 should take 1 to 2 weeks.

# Need

# Tool

# AI development

# Claude Pro + Claude Code

# Website

# React + Vite

# 3D

# Three.js via React Three Fiber

# UI animation

# Motion

# Cinematic scroll animation

# GSAP

# Textures and lighting

# Poly Haven

# Code and hosting

# GitHub, then Vercel or Netlify

# In version 1: landing statement ("I don't code. I build with AI."), a short journey (Healthcare IT to AI to Product to Project Management), the Idea to Prompt to Claude to Code to Iteration to Product strip, the six-chapter 3D scroll, four experiment cards (AI PM, Healthcare AI, AI Agents, Vibe Coding), and a footer with LinkedIn, GitHub and contact.

# Not in version 1: working experiments behind the cards, user accounts, or any backend.

# Inspiration board and build plan

# Start with the folder AI-WEB-LAB/inspiration and save about five examples each of heroes, 3D scenes, scroll interactions, typography and navigation from Awwwards, Godly and GitHub. Save individual ideas, not whole sites, then ask Claude to distil a shared visual language without copying any one site.

# Build in stages with Claude Code:

# 1\. Architect: propose the stack, folder structure and phases in plain English. No code yet.

# 2\. Design: write the full design system. No code yet.

# 3\. Build Phase 1 only: run it, fix errors, explain changes simply.

# 4\. Iterate: you say what feels wrong; Claude fixes it. Then have Claude review it as a UX designer, QA engineer and performance engineer.

# 5\. Deploy and post: publish to Vercel or Netlify and record a 15 to 30 second screen capture for LinkedIn that shows the process, not just the result.The AI Project Manager

