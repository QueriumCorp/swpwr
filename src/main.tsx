import React from 'react'
import ReactDOM from 'react-dom/client'
import StepWisePower from './SWPower.tsx'
import './index.css'
import './swReact.css'
import './animeTutor.css'

// Extend window namespace so TS knows about it
declare global {
  interface Window {
    swpwr: any
  }
}
window.swpwr = window.swpwr || {}

var gltfUrl
console.info('ENVIRONMENT', import.meta.env)

// get rank from url
let params = new URLSearchParams(window.location.search)
let urlRank = params.get('rank')
let urlSWAPI = params.get('swapi')

let problem: any = {},
  student: any = {},
  options: any = {},
  session: any = {},
  log: any = [],
  handlers: any = {}

if (window.swpwr) {
  problem.appKey = window.swpwr.problem.appKey
  problem.policyId = window.swpwr.problem.policyId
  problem.problemId = window.swpwr.problem.problemId
  problem.title = window.swpwr.problem.title
  problem.stimulus = window.swpwr.problem.stimulus
  problem.class = window.swpwr.problem.topic
  problem.question = window.swpwr.problem.definition
  problem.hints = window.swpwr.problem.mathHints

  problem.wpHints = window.swpwr.problem.wpHints.map(
    (page: { pageId?: string; page?: string; hints: any }) => {
      return {
        page: page.pageId ? page.pageId : page.page,
        hints: page.hints,
      }
    },
  )

  student.studentId = window.swpwr.student.studentId
  student.studentName = window.swpwr.student.fullName

  const oldSession = window.swpwr.oldSession
  let oldLog = window.swpwr.oldLog

  // const oldSession =
  //   "{&quot;sessionToken&quot;: &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZhbGwyMDI0UFMxUTEiLCJzdHVkZW50SWQiOiJqaW0iLCJzZXJ2ZXJVcmwiOiJodHRwczovL3N0ZXB3aXNlYWkwMC5xdWVyaXVtLmNvbS93ZWJNYXRoZW1hdGljYS9hcGkvIiwic3RhcnRlZEF0IjoxNzMzMjM5NzczMDQ4LCJpYXQiOjE3MzMyMzk3NzMsImV4cCI6MTczNDEwMzc3M30.JO0tfkwYgpfHU04OCw5cqbmHYfxEtATe8eJcFZVLU7E&quot;, &quot;identifiers&quot;: [&quot;T&quot;], &quot;operators&quot;: [&quot;Frac&quot;], &quot;knowns&quot;: [&quot;7 miles&quot;], &quot;unknowns&quot;: [], &quot;schema&quot;: &quot;&quot;, &quot;equation&quot;: &quot;&quot;, &quot;schemaValues&quot;: [], &quot;explanations&quot;: [{&quot;type&quot;: &quot;bad&quot;, &quot;text&quot;: &quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}, {&quot;type&quot;: &quot;estimation&quot;, &quot;text&quot;: &quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it's close to 20 miles.&quot;}, {&quot;type&quot;: &quot;schema&quot;, &quot;text&quot;: &quot;The total distance is more than each part. So 18 miles makes sense because it's greater than 7 miles and 11 miles.&quot;}], &quot;highlights&quot;: [{&quot;highlight&quot;: [&quot;7&quot;, &quot;miles&quot;], &quot;index&quot;: &quot;A&quot;, &quot;type&quot;: &quot;valueUnit&quot;, &quot;done&quot;: false}, {&quot;highlight&quot;: [&quot;11&quot;, &quot;miles&quot;], &quot;index&quot;: &quot;B&quot;, &quot;type&quot;: &quot;valueUnit&quot;, &quot;done&quot;: false}, {&quot;highlight&quot;: &quot;What is the total distance that Pilar drove?&quot;, &quot;index&quot;: &quot;C&quot;, &quot;type&quot;: &quot;string&quot;, &quot;done&quot;: false}], &quot;stimulusClaims&quot;: &quot;____________AAAAAAA_____________________________________BBBBBBBB_____________CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC&quot;, &quot;endPhaseWEqn&quot;: &quot;T = 18&quot;, &quot;phaseESentence&quot;: &quot;Pilar drove a total of [VALUE] [UNIT].&quot;, &quot;mathSolution&quot;: [], &quot;mathAnswer&quot;: &quot;&quot;, &quot;myOwnWordsParts&quot;: {&quot;fragment0&quot;: &quot;Pilar drove a total of &quot;, &quot;fragment1&quot;: &quot; &quot;, &quot;fragment2&quot;: &quot;.&quot;, &quot;blank0&quot;: &quot;[VALUE]&quot;, &quot;blank1&quot;: &quot;[UNIT]&quot;, &quot;value0&quot;: &quot;&quot;, &quot;value1&quot;: &quot;&quot;}, &quot;myOwnWords&quot;: &quot;&quot;, &quot;selectedExplanation&quot;: {&quot;type&quot;: &quot;estimation&quot;, &quot;text&quot;: &quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it's close to 20 miles.&quot;}, &quot;finalAnswer&quot;: &quot;&quot;, &quot;chatty&quot;: false, &quot;networkSpeedMbps&quot;: {&quot;type&quot;: &quot;4g (Mbps)&quot;, &quot;Mbps&quot;: 10}, &quot;aiBusy&quot;: false, &quot;lastPageIndex&quot;: 1}"
  // const oldLog =
  //   "[{&quot;timestamp&quot;: &quot;2024-12-03T15:29:25.827Z&quot;, &quot;page&quot;: &quot;OwnWords&quot;, &quot;activity&quot;: &quot;changedValues&quot;, &quot;data&quot;: {&quot;value0&quot;: &quot;&quot;, &quot;value1&quot;: &quot;&quot;}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:38.491Z&quot;, &quot;page&quot;: &quot;none&quot;, &quot;activity&quot;: &quot;initSession&quot;, &quot;data&quot;: {&quot;theProblem&quot;: {&quot;appKey&quot;: &quot;JiraTestPage&quot;, &quot;studentId&quot;: &quot;jim&quot;, &quot;id&quot;: &quot;Fall2024PS1Q1&quot;, &quot;title&quot;: &quot;SAMPLE&quot;, &quot;definition&quot;: &quot;SolveWordProblemAns[{&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;}]&quot;, &quot;stimulus&quot;: &quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;, &quot;topic&quot;: &quot;gradeBasicAlgebra&quot;, &quot;hints&quot;: []}, &quot;response&quot;: {}, &quot;data&quot;: {&quot;status&quot;: &quot;200&quot;, &quot;sessionToken&quot;: &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZhbGwyMDI0UFMxUTEiLCJzdHVkZW50SWQiOiJqaW0iLCJzZXJ2ZXJVcmwiOiJodHRwczovL3N0ZXB3aXNlYWkwMC5xdWVyaXVtLmNvbS93ZWJNYXRoZW1hdGljYS9hcGkvIiwic3RhcnRlZEF0IjoxNzMzMjM5NzczMDQ4LCJpYXQiOjE3MzMyMzk3NzMsImV4cCI6MTczNDEwMzc3M30.JO0tfkwYgpfHU04OCw5cqbmHYfxEtATe8eJcFZVLU7E&quot;, &quot;identifiers&quot;: [&quot;T&quot;], &quot;operators&quot;: [&quot;Frac&quot;], &quot;explanation&quot;: [{&quot;type&quot;: &quot;bad&quot;, &quot;text&quot;: &quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}, {&quot;type&quot;: &quot;estimation&quot;, &quot;text&quot;: &quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it's close to 20 miles.&quot;}, {&quot;type&quot;: &quot;schema&quot;, &quot;text&quot;: &quot;The total distance is more than each part. So 18 miles makes sense because it's greater than 7 miles and 11 miles.&quot;}], &quot;endPhaseWEqn&quot;: &quot;T = 18&quot;, &quot;phaseESentence&quot;: &quot;Pilar drove a total of [VALUE] [UNIT].&quot;, &quot;highlights&quot;: [[&quot;7&quot;, &quot;miles&quot;], [&quot;11&quot;, &quot;miles&quot;], &quot;What is the total distance that Pilar drove?&quot;], &quot;fullURL&quot;: &quot;https://stepwiseai00.querium.com/webMathematica/api/?appKey=JiraTestPage&cmd=initializeSession&session=Fall2024PS1Q1%24jim%241733239773048&class=gradeBasicAlgebra&question=SolveWordProblemAns[%7B&quot;Pilar%20drove%207%20miles%20from%20home%20to%20school.%20Then%20she%20drove%2011%20miles%20to%20her%20job.%20What%20is%20the%20total%20distance%20that%20Pilar%20drove?&quot;%7D]&policies=$A9$&qs1=undefined&qs2=undefined&qs3=undefined&quot;, &quot;rawResponse&quot;: &quot;<result>{&quot;explanation&quot;:[{&quot;type&quot;:&quot;schema&quot;,&quot;text&quot;:&quot;The total distance is more than each part. So 18 miles makes sense because it&apos;s greater than 7 miles and 11 miles.&quot;},{&quot;type&quot;:&quot;estimation&quot;,&quot;text&quot;:&quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it&apos;s close to 20 miles.&quot;},{&quot;type&quot;:&quot;bad&quot;,&quot;text&quot;:&quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}],&quot;statefile&quot;:&quot;/var/lib/tomcat8/webapps/webMathematica/api/states/Fall2024PS1Q1xjimx1733239773048.mx&quot;,&quot;cmdResponse&quot;:&quot;reProcessLRV&quot;,&quot;feedback&quot;:&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;,&quot;variables&quot;:[&quot;T&quot;],&quot;operators&quot;:[&quot;Frac&quot;],&quot;phaseESentence&quot;:&quot;Pilar drove a total of [VALUE] [UNIT].&quot;,&quot;endPhaseWEqn&quot;:&quot;T = 18&quot;,&quot;highlights&quot;:{&quot;highlight1&quot;:[&quot;7&quot;,&quot;miles&quot;],&quot;highlight2&quot;:[&quot;11&quot;,&quot;miles&quot;],&quot;highlight3&quot;:&quot;What is the total distance that Pilar drove?&quot;}}</result>&quot;, &quot;et&quot;: 5360}}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:48.939Z&quot;, &quot;page&quot;: &quot;ReadProblem&quot;, &quot;activity&quot;: &quot;clickNext&quot;, &quot;data&quot;: {}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:48.940Z&quot;, &quot;page&quot;: &quot;FindFacts&quot;, &quot;activity&quot;: &quot;ARRIVED&quot;, &quot;data&quot;: {}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:54.763Z&quot;, &quot;page&quot;: &quot;FindFacts&quot;, &quot;activity&quot;: &quot;dndAddKnownFact&quot;, &quot;data&quot;: {&quot;fact&quot;: &quot;7 miles&quot;}}]"

  // const oldLog0 =
  //   "[{&quot;timestamp&quot;: &quot;2024-12-03T15:29:25.827Z&quot;, &quot;page&quot;: &quot;OwnWords&quot;, &quot;activity&quot;: &quot;changedValues&quot;, &quot;data&quot;: {&quot;value0&quot;: &quot;&quot;, &quot;value1&quot;: &quot;&quot;}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:38.491Z&quot;, &quot;page&quot;: &quot;none&quot;, &quot;activity&quot;: &quot;initSession&quot;, &quot;data&quot;: {&quot;theProblem&quot;: {&quot;appKey&quot;: &quot;JiraTestPage&quot;, &quot;studentId&quot;: &quot;jim&quot;, &quot;id&quot;: &quot;Fall2024PS1Q1&quot;, &quot;title&quot;: &quot;SAMPLE&quot;, &quot;definition&quot;: &quot;SolveWordProblemAns[{&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;}]&quot;, &quot;stimulus&quot;: &quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;, &quot;topic&quot;: &quot;gradeBasicAlgebra&quot;, &quot;hints&quot;: []}, &quot;response&quot;: {}, &quot;data&quot;: {&quot;status&quot;: &quot;200&quot;, &quot;sessionToken&quot;: &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZhbGwyMDI0UFMxUTEiLCJzdHVkZW50SWQiOiJqaW0iLCJzZXJ2ZXJVcmwiOiJodHRwczovL3N0ZXB3aXNlYWkwMC5xdWVyaXVtLmNvbS93ZWJNYXRoZW1hdGljYS9hcGkvIiwic3RhcnRlZEF0IjoxNzMzMjM5NzczMDQ4LCJpYXQiOjE3MzMyMzk3NzMsImV4cCI6MTczNDEwMzc3M30.JO0tfkwYgpfHU04OCw5cqbmHYfxEtATe8eJcFZVLU7E&quot;, &quot;identifiers&quot;: [&quot;T&quot;], &quot;operators&quot;: [&quot;Frac&quot;], &quot;explanation&quot;: [{&quot;type&quot;: &quot;bad&quot;, &quot;text&quot;: &quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}, {&quot;type&quot;: &quot;estimation&quot;, &quot;text&quot;: &quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it's close to 20 miles.&quot;}, {&quot;type&quot;: &quot;schema&quot;, &quot;text&quot;: &quot;The total distance is more than each part. So 18 miles makes sense because it's greater than 7 miles and 11 miles.&quot;}], &quot;endPhaseWEqn&quot;: &quot;T = 18&quot;, &quot;phaseESentence&quot;: &quot;Pilar drove a total of [VALUE] [UNIT].&quot;, &quot;highlights&quot;: [[&quot;7&quot;, &quot;miles&quot;], [&quot;11&quot;, &quot;miles&quot;], &quot;What is the total distance that Pilar drove?&quot;], &quot;fullURL&quot;: &quot;https://stepwiseai00.querium.com/webMathematica/api/?appKey=JiraTestPage&cmd=initializeSession&session=Fall2024PS1Q1%24jim%241733239773048&class=gradeBasicAlgebra&question=SolveWordProblemAns[%7B&quot;Pilar%20drove%207%20miles%20from%20home%20to%20school.%20Then%20she%20drove%2011%20miles%20to%20her%20job.%20What%20is%20the%20total%20distance%20that%20Pilar%20drove?&quot;%7D]&policies=$A9$&qs1=undefined&qs2=undefined&qs3=undefined&quot;, &quot;rawResponse&quot;: &quot;<result>{&quot;explanation&quot;:[{&quot;type&quot;:&quot;schema&quot;,&quot;text&quot;:&quot;The total distance is more than each part. So 18 miles makes sense because it&apos;s greater than 7 miles and 11 miles.&quot;},{&quot;type&quot;:&quot;estimation&quot;,&quot;text&quot;:&quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it&apos;s close to 20 miles.&quot;},{&quot;type&quot;:&quot;bad&quot;,&quot;text&quot;:&quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}],&quot;statefile&quot;:&quot;/var/lib/tomcat8/webapps/webMathematica/api/states/Fall2024PS1Q1xjimx1733239773048.mx&quot;,&quot;cmdResponse&quot;:&quot;reProcessLRV&quot;,&quot;feedback&quot;:&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;,&quot;variables&quot;:[&quot;T&quot;],&quot;operators&quot;:[&quot;Frac&quot;],&quot;phaseESentence&quot;:&quot;Pilar drove a total of [VALUE] [UNIT].&quot;,&quot;endPhaseWEqn&quot;:&quot;T = 18&quot;,&quot;highlights&quot;:{&quot;highlight1&quot;:[&quot;7&quot;,&quot;miles&quot;],&quot;highlight2&quot;:[&quot;11&quot;,&quot;miles&quot;],&quot;highlight3&quot;:&quot;What is the total distance that Pilar drove?&quot;}}</result>&quot;, &quot;et&quot;: 5360}}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:48.939Z&quot;, &quot;page&quot;: &quot;ReadProblem&quot;, &quot;activity&quot;: &quot;clickNext&quot;, &quot;data&quot;: {}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:48.940Z&quot;, &quot;page&quot;: &quot;FindFacts&quot;, &quot;activity&quot;: &quot;ARRIVED&quot;, &quot;data&quot;: {}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:54.763Z&quot;, &quot;page&quot;: &quot;FindFacts&quot;, &quot;activity&quot;: &quot;dndAddKnownFact&quot;, &quot;data&quot;: {&quot;fact&quot;: &quot;7 miles&quot;}}]"
  // const oldLog1 =
  //   "[{&quot;timestamp&quot;: &quot;2024-12-03T15:29:25.827Z&quot;, &quot;page&quot;: &quot;OwnWords&quot;, &quot;activity&quot;: &quot;changedValues&quot;, &quot;data&quot;: {&quot;value0&quot;: &quot;&quot;, &quot;value1&quot;: &quot;&quot;}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:38.491Z&quot;, &quot;page&quot;: &quot;none&quot;, &quot;activity&quot;: &quot;initSession&quot;, &quot;data&quot;: {&quot;theProblem&quot;: {&quot;appKey&quot;: &quot;JiraTestPage&quot;, &quot;studentId&quot;: &quot;jim&quot;, &quot;id&quot;: &quot;Fall2024PS1Q1&quot;, &quot;title&quot;: &quot;SAMPLE&quot;, &quot;definition&quot;: &quot;SolveWordProblemAns[{&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;}]&quot;, &quot;stimulus&quot;: &quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;, &quot;topic&quot;: &quot;gradeBasicAlgebra&quot;, &quot;hints&quot;: []}, &quot;response&quot;: {}, &quot;data&quot;: {&quot;status&quot;: &quot;200&quot;, &quot;sessionToken&quot;: &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZhbGwyMDI0UFMxUTEiLCJzdHVkZW50SWQiOiJqaW0iLCJzZXJ2ZXJVcmwiOiJodHRwczovL3N0ZXB3aXNlYWkwMC5xdWVyaXVtLmNvbS93ZWJNYXRoZW1hdGljYS9hcGkvIiwic3RhcnRlZEF0IjoxNzMzMjM5NzczMDQ4LCJpYXQiOjE3MzMyMzk3NzMsImV4cCI6MTczNDEwMzc3M30.JO0tfkwYgpfHU04OCw5cqbmHYfxEtATe8eJcFZVLU7E&quot;, &quot;identifiers&quot;: [&quot;T&quot;], &quot;operators&quot;: [&quot;Frac&quot;], &quot;explanation&quot;: [{&quot;type&quot;: &quot;bad&quot;, &quot;text&quot;: &quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}, {&quot;type&quot;: &quot;estimation&quot;, &quot;text&quot;: &quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it's close to 20 miles.&quot;}, {&quot;type&quot;: &quot;schema&quot;, &quot;text&quot;: &quot;The total distance is more than each part. So 18 miles makes sense because it's greater than 7 miles and 11 miles.&quot;}], &quot;endPhaseWEqn&quot;: &quot;T = 18&quot;, &quot;phaseESentence&quot;: &quot;Pilar drove a total of [VALUE] [UNIT].&quot;, &quot;highlights&quot;: [[&quot;7&quot;, &quot;miles&quot;], [&quot;11&quot;, &quot;miles&quot;], &quot;What is the total distance that Pilar drove?&quot;], &quot;fullURL&quot;: &quot;https://stepwiseai00.querium.com/webMathematica/api/?appKey=JiraTestPage&cmd=initializeSession&session=Fall2024PS1Q1%24jim%241733239773048&class=gradeBasicAlgebra&question=SolveWordProblemAns[%7B&quot;Pilar%20drove%207%20miles%20from%20home%20to%20school.%20Then%20she%20drove%2011%20miles%20to%20her%20job.%20What%20is%20the%20total%20distance%20that%20Pilar%20drove?&quot;%7D]&policies=$A9$&qs1=undefined&qs2=undefined&qs3=undefined&quot;, &quot;rawResponse&quot;: &quot;<result>{&quot;explanation&quot;:[{&quot;type&quot;:&quot;schema&quot;,&quot;text&quot;:&quot;The total distance is more than each part. So 18 miles makes sense because it&apos;s greater than 7 miles and 11 miles.&quot;},{&quot;type&quot;:&quot;estimation&quot;,&quot;text&quot;:&quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it&apos;s close to 20 miles.&quot;},{&quot;type&quot;:&quot;bad&quot;,&quot;text&quot;:&quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}],&quot;statefile&quot;:&quot;/var/lib/tomcat8/webapps/webMathematica/api/states/Fall2024PS1Q1xjimx1733239773048.mx&quot;,&quot;cmdResponse&quot;:&quot;reProcessLRV&quot;,&quot;feedback&quot;:&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;,&quot;variables&quot;:[&quot;T&quot;],&quot;operators&quot;:[&quot;Frac&quot;],&quot;phaseESentence&quot;:&quot;Pilar drove a total of [VALUE] [UNIT].&quot;,&quot;endPhaseWEqn&quot;:&quot;T = 18&quot;,&quot;highlights&quot;:{&quot;highlight1&quot;:[&quot;7&quot;,&quot;miles&quot;],&quot;highlight2&quot;:[&quot;11&quot;,&quot;miles&quot;],&quot;highlight3&quot;:&quot;What is the total distance that Pilar drove?&quot;}}</result>&quot;, &quot;et&quot;: 5360}}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:48.939Z&quot;, &quot;page&quot;: &quot;ReadProblem&quot;, &quot;activity&quot;: &quot;clickNext&quot;, &quot;data&quot;: {}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:48.940Z&quot;, &quot;page&quot;: &quot;FindFacts&quot;, &quot;activity&quot;: &quot;ARRIVED&quot;, &quot;data&quot;: {}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:54.763Z&quot;, &quot;page&quot;: &quot;FindFacts&quot;, &quot;activity&quot;: &quot;dndAddKnownFact&quot;, &quot;data&quot;: {&quot;fact&quot;: &quot;7 miles&quot;}}]"
  // const oldLog2 =
  //   "[{&quot;timestamp&quot;: &quot;2024-12-03T15:29:25.827Z&quot;, &quot;page&quot;: &quot;OwnWords&quot;, &quot;activity&quot;: &quot;changedValues&quot;, &quot;data&quot;: {&quot;value0&quot;: &quot;&quot;, &quot;value1&quot;: &quot;&quot;}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:38.491Z&quot;, &quot;page&quot;: &quot;none&quot;, &quot;activity&quot;: &quot;initSession&quot;, &quot;data&quot;: {&quot;theProblem&quot;: {&quot;appKey&quot;: &quot;JiraTestPage&quot;, &quot;studentId&quot;: &quot;jim&quot;, &quot;id&quot;: &quot;Fall2024PS1Q1&quot;, &quot;title&quot;: &quot;SAMPLE&quot;, &quot;definition&quot;: &quot;SolveWordProblemAns[{&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;}]&quot;, &quot;stimulus&quot;: &quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;, &quot;topic&quot;: &quot;gradeBasicAlgebra&quot;, &quot;hints&quot;: []}, &quot;response&quot;: {}, &quot;data&quot;: {&quot;status&quot;: &quot;200&quot;, &quot;sessionToken&quot;: &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkZhbGwyMDI0UFMxUTEiLCJzdHVkZW50SWQiOiJqaW0iLCJzZXJ2ZXJVcmwiOiJodHRwczovL3N0ZXB3aXNlYWkwMC5xdWVyaXVtLmNvbS93ZWJNYXRoZW1hdGljYS9hcGkvIiwic3RhcnRlZEF0IjoxNzMzMjM5NzczMDQ4LCJpYXQiOjE3MzMyMzk3NzMsImV4cCI6MTczNDEwMzc3M30.JO0tfkwYgpfHU04OCw5cqbmHYfxEtATe8eJcFZVLU7E&quot;, &quot;identifiers&quot;: [&quot;T&quot;], &quot;operators&quot;: [&quot;Frac&quot;], &quot;explanation&quot;: [{&quot;type&quot;: &quot;bad&quot;, &quot;text&quot;: &quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}, {&quot;type&quot;: &quot;estimation&quot;, &quot;text&quot;: &quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it's close to 20 miles.&quot;}, {&quot;type&quot;: &quot;schema&quot;, &quot;text&quot;: &quot;The total distance is more than each part. So 18 miles makes sense because it's greater than 7 miles and 11 miles.&quot;}], &quot;endPhaseWEqn&quot;: &quot;T = 18&quot;, &quot;phaseESentence&quot;: &quot;Pilar drove a total of [VALUE] [UNIT].&quot;, &quot;highlights&quot;: [[&quot;7&quot;, &quot;miles&quot;], [&quot;11&quot;, &quot;miles&quot;], &quot;What is the total distance that Pilar drove?&quot;], &quot;fullURL&quot;: &quot;https://stepwiseai00.querium.com/webMathematica/api/?appKey=JiraTestPage&cmd=initializeSession&session=Fall2024PS1Q1%24jim%241733239773048&class=gradeBasicAlgebra&question=SolveWordProblemAns[%7B&quot;Pilar%20drove%207%20miles%20from%20home%20to%20school.%20Then%20she%20drove%2011%20miles%20to%20her%20job.%20What%20is%20the%20total%20distance%20that%20Pilar%20drove?&quot;%7D]&policies=$A9$&qs1=undefined&qs2=undefined&qs3=undefined&quot;, &quot;rawResponse&quot;: &quot;<result>{&quot;explanation&quot;:[{&quot;type&quot;:&quot;schema&quot;,&quot;text&quot;:&quot;The total distance is more than each part. So 18 miles makes sense because it&apos;s greater than 7 miles and 11 miles.&quot;},{&quot;type&quot;:&quot;estimation&quot;,&quot;text&quot;:&quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it&apos;s close to 20 miles.&quot;},{&quot;type&quot;:&quot;bad&quot;,&quot;text&quot;:&quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}],&quot;statefile&quot;:&quot;/var/lib/tomcat8/webapps/webMathematica/api/states/Fall2024PS1Q1xjimx1733239773048.mx&quot;,&quot;cmdResponse&quot;:&quot;reProcessLRV&quot;,&quot;feedback&quot;:&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;,&quot;variables&quot;:[&quot;T&quot;],&quot;operators&quot;:[&quot;Frac&quot;],&quot;phaseESentence&quot;:&quot;Pilar drove a total of [VALUE] [UNIT].&quot;,&quot;endPhaseWEqn&quot;:&quot;T = 18&quot;,&quot;highlights&quot;:{&quot;highlight1&quot;:[&quot;7&quot;,&quot;miles&quot;],&quot;highlight2&quot;:[&quot;11&quot;,&quot;miles&quot;],&quot;highlight3&quot;:&quot;What is the total distance that Pilar drove?&quot;}}</result>&quot;, &quot;et&quot;: 5360}}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:48.939Z&quot;, &quot;page&quot;: &quot;ReadProblem&quot;, &quot;activity&quot;: &quot;clickNext&quot;, &quot;data&quot;: {}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:48.940Z&quot;, &quot;page&quot;: &quot;FindFacts&quot;, &quot;activity&quot;: &quot;ARRIVED&quot;, &quot;data&quot;: {}}, {&quot;timestamp&quot;: &quot;2024-12-03T15:29:54.763Z&quot;, &quot;page&quot;: &quot;FindFacts&quot;, &quot;activity&quot;: &quot;dndAddKnownFact&quot;, &quot;data&quot;: {&quot;fact&quot;: &quot;7 miles&quot;}}]"

  // PREPARE oldSession to enable restore
  if (
    oldSession &&
    typeof oldSession == 'string' &&
    oldSession.includes('&quot;')
  ) {
    // oldSession has &quot; and needs full data cleansing
    try {
      session = JSON.parse(oldSession.replace(/&quot;/g, '"'))
    } catch {
      session = {}
    }
  } else if (typeof oldSession == 'string') {
    // oldSession is a string so needs parsing
    try {
      session = JSON.parse(oldSession)
    } catch {
      session = {}
    }
  } else if (typeof oldSession == 'object') {
    // oldSession is an object so assign to session
    session = { ...(oldSession as object) }
  } else {
    // oldSession is inscrutable so set session to {}
    session = {}
  }

  // PREPARE oldLog to enable restore
  if (oldLog && typeof oldLog == 'string' && oldLog.includes('&quot;')) {
    // oldLog has &quot; and needs full data cleansing
    try {
      /* FULLURL
        The fullURL sent to qEval contains a question queryString that contains exactly two &quot;
        Replace them with &apos;
        Sample question queryString
        question=SolveWordProblemAns[%7B&quot;Pilar%20drove%207%20miles%20from%20home%20to%20school.%20Then%20she%20drove%2011%20miles%20to%20her%20job.%20What%20is%20the%20total%20distance%20that%20Pilar%20drove?&quot;%7D]
      */
      let questionIndex = oldLog.indexOf('question=')
      if (questionIndex !== -1) {
        // Find the substring starting from "question="
        let substringAfterQuestion = oldLog.substring(questionIndex)

        // Replace the first two "&quot;" with "&apos;"
        let modifiedSubstring = substringAfterQuestion.replace(
          /&quot;/g,
          (match, index, original) => {
            return index <
              original.indexOf('&quot;', original.indexOf('&quot;') + 1) + 6
              ? "'"
              : match
          },
        )

        // Combine the parts
        oldLog = oldLog.substring(0, questionIndex) + modifiedSubstring
      }

      /* REPLACE REMAINING &quot; CHARACTERS 
        Replace all the remaining &quot; with the " character
      */
      oldLog = oldLog.replace(/&quot;/g, '"')

      /* RAWRESULTS
        Within the rawResults <result></result> tag from qEval, replace the " with '
        Sample rawResult
        <result>{&quot;explanation&quot;:[{&quot;type&quot;:&quot;schema&quot;,&quot;text&quot;:&quot;The total distance is more than each part. So 18 miles makes sense because it&apos;s greater than 7 miles and 11 miles.&quot;},{&quot;type&quot;:&quot;estimation&quot;,&quot;text&quot;:&quot;Pilar drove about 10 miles to school. She drove about 10 miles to her job. So she drove about 10 + 10 = 20 miles in all. The answer 18 miles makes sense because it&apos;s close to 20 miles.&quot;},{&quot;type&quot;:&quot;bad&quot;,&quot;text&quot;:&quot;Pilar drove to two different places. So the total 18 miles makes sense.&quot;}],&quot;statefile&quot;:&quot;\/var\/lib\/tomcat8\/webapps\/webMathematica\/api\/states\/Fall2024PS1Q1xjimx1733331864466.mx&quot;,&quot;cmdResponse&quot;:&quot;reProcessLRV&quot;,&quot;feedback&quot;:&quot;Pilar drove 7 miles from home to school. Then she drove 11 miles to her job. What is the total distance that Pilar drove?&quot;,&quot;variables&quot;:[&quot;T&quot;],&quot;operators&quot;:[&quot;Frac&quot;],&quot;phaseESentence&quot;:&quot;Pilar drove a total of [VALUE] [UNIT].&quot;,&quot;endPhaseWEqn&quot;:&quot;T = 18&quot;,&quot;highlights&quot;:{&quot;highlight1&quot;:[&quot;7&quot;,&quot;miles&quot;],&quot;highlight2&quot;:[&quot;11&quot;,&quot;miles&quot;],&quot;highlight3&quot;:&quot;What is the total distance that Pilar drove?&quot;}}</result>
      */
      oldLog = oldLog.replace(
        /(<result>)(.*?)(<\/result>)/gs,
        (_match: string, p1: string, p2: string, p3: string) => {
          return p1 + p2.replace(/"/g, "'") + p3
        },
      )

      log = JSON.parse(oldLog)
    } catch (e) {
      console.error(e)
      log = []
    }
  } else if (typeof oldLog == 'string') {
    // oldLog is a string so needs parsing
    try {
      log = JSON.parse(oldLog)
    } catch (e) {
      console.error(e)
      log = []
    }
  } else if (typeof oldLog == 'object') {
    // oldLog is an object so assign to log
    log = [...oldLog]
  } else {
    // oldLog is inscrutable so set log to []
    log = []
  }

  options.swapiUrl =
    urlSWAPI ||
    import.meta.env.VITE_SWAPI ||
    window.swpwr.options.swapiUrl ||
    'https://swapi2.onrender.com'
  options.gltfUrl = window.swpwr.options.gltfUrl
  options.voiceId = window.swpwr.options.voiceId
  options.voiceName = window.swpwr.options.voiceName
  options.rank =
    urlRank || import.meta.env.VITE_RANK || window.swpwr.options.rank || 'newb'
  options.disabledSchemas = window.swpwr.options.disabledSchemas

  handlers.onComplete = window.swpwr.handlers.onComplete
  handlers.onStep = window.swpwr.handlers.onStep
} else {
  problem = {
    appKey: 'JiraTestPage',
    policyId: '$A9$',
    problemId: 'QUES-30533',
    title: 'Sticker Book Cost',
    stimulus:
      'Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book.',
    class: 'gradeBasicAlgebra',
    question:
      'SolveWordProblemAns[{"Minh spent $6.25 on 5 sticker books to give his nephews. Find the cost of each sticker book."}]',
    hints: [],
  }

  student = {
    studentId: 'PokeyLoki',
    studentName: 'Loki Van Riper',
  }

  handlers.onComplete = () => {
    console.info("I'm a built-in onComplete Handler")
  }

  options = {
    swapiUrl:
      urlSWAPI ||
      import.meta.env.VITE_SWAPI ||
      window.swpwr.options.swapiUrl ||
      'https://swapi2.onrender.com',
    gltfUrl,
    rank:
      urlRank ||
      import.meta.env.VITE_RANK ||
      window.swpwr.options.rank ||
      'newb',
    disabledSchemas: [],
  }
}

console.table('PROBLEM', problem)
console.table('STUDENT', student)
console.table('OPTIONS', options)
console.table('SESSION', session)

ReactDOM.createRoot(document.getElementById('qqROOT')!).render(
  <React.StrictMode>
    <div className="SWPowerComponent relative h-dvh w-dvw overflow-hidden">
      <StepWisePower
        className="absolute bottom-0 left-0 right-0 top-0 flex flex-col"
        problem={problem}
        student={student}
        oldSession={session}
        oldStudentLog={log}
        options={options}
        onComplete={handlers.onComplete}
        onStep={handlers.onStep}
      />
    </div>
  </React.StrictMode>,
)
