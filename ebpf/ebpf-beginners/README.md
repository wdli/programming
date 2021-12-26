#
# 12/25/21
#  Followed the instruction at
#   https://courses.academy.tigera.io/courses/course-v1:tigera+CCO-L2-EBPF+CCO-L2-EBPF-2021/courseware/bfd1d4bbfa42406795304277d8d8e164/331397c95d224b3983d8fd612938ff50/?child=first
#
#  Succesfully build the example/c
#

docker build . -f Dockerfile.calicotraining -t david-ebpf-calico
docker run --rm -it --privileged --name app --env TERM=xterm-color -v /sys/kernel/debug:/sys/kernel/debug:rw david-ebpf-calico
