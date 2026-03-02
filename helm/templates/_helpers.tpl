{{/*
Helper para generar el nombre completo del release.
*/}}
{{- define "nexushotel.fullname" -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Helper para generar labels comunes a todos los recursos.
*/}}
{{- define "nexushotel.labels" -}}
app: {{ .Values.appName }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/name: {{ .Values.appName }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Values.image.tag | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Helper para selector labels (usados en Deployment y Service).
*/}}
{{- define "nexushotel.selectorLabels" -}}
app: {{ .Values.appName }}
app.kubernetes.io/name: {{ .Values.appName }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
