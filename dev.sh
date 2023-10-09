#!/bin/bash
start=$SECONDS


deploy="/home/$USER/dev/kubernetes/anova"
microk8s.kubectl delete -f "$deploy/06_deployment_anova_dev.yml"
microk8s.kubectl apply -f "$deploy/06_deployment_anova_dev.yml"

end=$SECONDS
runtime=$((end - start))
today=`date +"%d-%m-%Y %T"`
echo -e "\n\n\U1F5FF Development version"
echo -e "\n\U1F4C5 $today"
echo -e "\U231B Завершено за $runtime сек."
