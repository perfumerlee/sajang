import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('PHASE 5 reference gate source contracts', () => {
  it('keeps reference-tool layout out of generic Engine foundation', () => {
    const foundation = readFileSync('src/engine/styles/foundation.css', 'utf8');
    expect(foundation).not.toMatch(/daily-sales-/);
  });

  it('routes the page through the ToolDefinition renderer and static knowledge contract', () => {
    const page = readFileSync('src/pages/tools/daily-sales-target.astro', 'utf8');
    const definition = readFileSync('src/projects/sajang/tools/daily-sales-target/definition.ts', 'utf8');
    expect(page).toContain('ToolKnowledgePage');
    expect(page).toContain('validateProjectDefinition');
    for (const section of ['shortAnswer', 'definition', 'howItWorks', 'formula', 'example', 'limitations', 'faq', 'sources']) {
      expect(definition).toContain(section);
    }
  });

  it('keeps the final remediation contracts explicit', () => {
    const client = readFileSync('src/projects/sajang/tools/daily-sales-target/client.ts', 'utf8');
    const input = readFileSync('src/engine/components/NumericInput.astro', 'utf8');
    const page = readFileSync('src/pages/tools/daily-sales-target.astro', 'utf8');
    const renderer = readFileSync('src/engine/components/ToolKnowledgePage.astro', 'utf8');
    const foundation = readFileSync('src/engine/styles/foundation.css', 'utf8');
    const projectStyles = readFileSync('src/projects/sajang/styles/daily-sales-target.css', 'utf8');
    expect(client).toContain('setFiniteResult(resultElement(\'customersNeeded\')!');
    expect(client).toContain("form.addEventListener('invalid'");
    expect(client).toContain("setAttribute('aria-describedby'");
    expect(input).toContain('data-error-id={errorId}');
    expect(page).toContain('class="engine-calculator daily-sales-layout"');
    expect(page).toContain('value={formatWon(exampleResult.targetDaily).replace(/원$/, \'\')}');
    expect(page).toContain('unit="원"');
    expect(client).toContain("[data-result-number]");
    expect(renderer).toContain('class="engine-reading engine-knowledge-prose"');
    expect(renderer).toContain('class="engine-formula"');
    expect(foundation).toContain('.engine-formula');
    expect(foundation).toContain('overflow-wrap: anywhere');
    expect(projectStyles).not.toContain('.daily-sales-formula');
  });
});
