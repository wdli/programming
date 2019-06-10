

# 6/2 Note



# Before this, first run ansible playbook to install all packages and configuration for the cluster

# On the master node:

## To use a separate pod network different from the host network: 10.10.1.0/24
sudo kubeadm init --apiserver-advertise-address=192.168.10.20 --pod-network-cidr=10.10.1.0/24


### Sample output:
....

Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:


sample --> kubeadm join 192.168.10.20:6443 --token mcyhrv.oiihrqwxn8542kd5 \
    --discovery-token-ca-cert-hash sha256:4975cb739bfdb1c3f6d75f70b91357c7532f790e3c42531cf3303ac30c07b04e


# On the Ubuntu host:
Download from master node /etc/kubernetes/admin.conf to the current directory and then run the kubeclt cmd:
 kubectl --kubeconfig=./admin.conf  < cmds>

Or make a copy of the current .kube/config file and create a new one with the contents from admin.conf

# Install CNI plugin


In "ansible-playbook" dir, do 

   kubectl apply -f calico.yaml


## Install Calico

Follow: https://docs.projectcalico.org/v3.7/getting-started/kubernetes/installation/calico

### Modifiy calico.yaml to use pod network address in the kubeadm init

### Apply the yaml files

kubectl apply -f calico.yaml


### kubectl get po --all-namespaces
make sure coredns up and running


# On worker1 or worker2 node, run the cmd from the output of the kubeadm cmd on the master node

[vagrant@worker1 ~]$ sudo kubeadm join 192.168.10.20:6443 --token w3oyje.gbolc52gqoimo0in --discovery-token-ca-cert-hash sha256:a7a9897bcbd905cc123d8d1ac016c577cbae493d9d1755ad60d5b09de8ae06c2
[preflight] Running pre-flight checks
	[WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". Please follow the guide at https://kubernetes.io/docs/setup/cri/
[preflight] Reading configuration from the cluster...
[preflight] FYI: You can look at this config file with 'kubectl -n kube-system get cm kubeadm-config -oyaml'
[kubelet-start] Downloading configuration for the kubelet from the "kubelet-config-1.14" ConfigMap in the kube-system namespace
[kubelet-start] Writing kubelet configuration to file "/var/lib/kubelet/config.yaml"
[kubelet-start] Writing kubelet environment file with flags to file "/var/lib/kubelet/kubeadm-flags.env"
[kubelet-start] Activating the kubelet service
[kubelet-start] Waiting for the kubelet to perform the TLS Bootstrap...

This node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.



### Note if needed go to master node to recreate the token
sudo kubeadm token create


### install calicoctl POD

Follow: https://docs.projectcalico.org/v3.7/getting-started/calicoctl/install
